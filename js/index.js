const guides = document.querySelector('.guides');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');

// loading...
if (!guides.hasChildNodes()) {
	guides.innerHTML =
		'<img class="loading" src="./img/loading.svg" alt="loading" />';
}

// setup UI
const setupUI = (user) => {
	if (user) {
		// Account info
		db.collection('users')
			.doc(user.uid)
			.get()
			.then((doc) => {
				const html = `
			<div>Logged in as ${user.email}!</div>
			<div>${doc.data().bio}</div>
		`;
				accountDetails.innerHTML = html;
			});

		// toggled UI elements
		loggedInLinks.forEach((item) => (item.style.display = 'block'));
		loggedOutLinks.forEach((item) => (item.style.display = 'none'));
	} else {
		accountDetails.innerHTML = '';

		// toggle UI elements
		loggedInLinks.forEach((item) => (item.style.display = 'none'));
		loggedOutLinks.forEach((item) => (item.style.display = 'block'));
	}
};

// setup guides
let setupGuides = (data) => {
	if (data.length) {
		let html = '';
		data.forEach((doc) => {
			const guide = doc.data();
			const li = `
			<li>
				<div class="collapsible-header grey lighten-4">${guide.title}</div>
				<div class="collapsible-body white">${guide.content}</div>
			</li>
		`;
			html += li;
			guides.innerHTML = html;
		});
	} else {
		let html = `<h4 class="center flow-text">What are you waiting for? Just log in!!!</h4>`;
		guides.innerHTML = html;
	}
};

// setup for materialze component
document.addEventListener('DOMContentLoaded', () => {
	let modals = document.querySelectorAll('.modal');
	M.Modal.init(modals);

	let items = document.querySelectorAll('.collapsible');
	M.Collapsible.init(items);
});
