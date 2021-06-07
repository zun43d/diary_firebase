let init = () => {
	// listen for auth state
	auth.onAuthStateChanged((user) => {
		if (user) {
			// get data
			db.collection('guides').onSnapshot(
				(snapshots) => {
					setupGuides(snapshots.docs);
					setupUI(user);
				},
				(err) => {
					console.log(err.message);
				}
			);
		} else {
			setupUI();
			setupGuides([]);
		}
	});

	// add guides
	const createForm = document.querySelector('#create-form');
	createForm.addEventListener('submit', (e) => {
		e.preventDefault();

		db.collection('guides')
			.add({
				title: createForm['title'].value,
				content: createForm['content'].value,
			})
			.then(() => {
				// close the modal and reset form
				const modal = document.querySelector('#modal-express');
				M.Modal.getInstance(modal).close();
				createForm.reset();
			});
	});

	// signup
	const signupForm = document.querySelector('#signup-form');
	signupForm.addEventListener('submit', (e) => {
		e.preventDefault();

		// get user info
		const email = signupForm['signup-email'].value;
		const pass = signupForm['signup-password'].value;

		// sign up the user
		auth
			.createUserWithEmailAndPassword(email, pass)
			.then((cred) => {
				return db.collection('users').doc(cred.user.uid).set({
					bio: signupForm['signup-bio'].value,
				});
			})
			.then(() => {
				// close signup modal & reset the form
				const modal = document.querySelector('#modal-signup');
				M.Modal.getInstance(modal).close();
				signupForm.reset();
			});
	});

	// logout
	const logout = document.querySelector('#logout');
	logout.addEventListener('click', (e) => {
		e.preventDefault();
		auth.signOut();
	});

	// login
	const loginForm = document.querySelector('#login-form');
	loginForm.addEventListener('submit', (e) => {
		e.preventDefault();

		// get user info
		const email = loginForm['login-email'].value;
		const pass = loginForm['login-password'].value;

		// log the user in
		auth.signInWithEmailAndPassword(email, pass).then((cred) => {
			// close the login form modal and reset the form
			const modal = document.querySelector('#modal-login');
			M.Modal.getInstance(modal).close();
			loginForm.reset();
		});
	});
};

init();
