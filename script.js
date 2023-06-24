// Get elements
const signupPage = document.getElementById('signup-page');
const signupForm = document.getElementById('signup-form');
const signupMessage = document.getElementById('signup-message');
const profilePage = document.getElementById('profile-page');
const profileDetails = document.getElementById('profile-details');
const logoutBtn = document.getElementById('logout-btn');

// Signup form submission
signupForm.addEventListener('submit', (event) => {
  event.preventDefault();
  signupMessage.innerHTML = '';

  // Get form values
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Generate access token
  const accessToken = generateAccessToken();

  // Create user object
  const user = {
    name,
    email,
    password,
    accessToken,
  };

  // Save user state to local storage
  localStorage.setItem('user', JSON.stringify(user));

  // Show success message
  signupMessage.classList.add('success');
  signupMessage.innerHTML = 'Signup successful! Redirecting to profile...';

  // Redirect to profile page after 2 seconds
  setTimeout(() => {
    window.location.href = '/profile';
  }, 2000);
});

// Logout button click
logoutBtn.addEventListener('click', () => {
  // Clear user state from local storage
  localStorage.removeItem('user');

  // Redirect to signup page
  window.location.href = '/';
});

// Check authentication and redirect if necessary
function checkAuthentication() {
  const user = JSON.parse(localStorage.getItem('user'));
  const path = window.location.pathname;

  if (!user || !user.accessToken) {
    if (path !== '/') {
      window.location.href = '/';
    }
  } else {
    if (path === '/') {
      window.location.href = '/profile';
    }
  }
}

// Generate access token
function generateAccessToken() {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const tokenLength = 16;
  let token = '';

  for (let i = 0; i < tokenLength; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return token;
}

// On page load
window.addEventListener('load', () => {
  checkAuthentication();

  const user = JSON.parse(localStorage.getItem('user'));

  if (user && user.accessToken) {
    // Show profile page
    profilePage.style.display = 'block';

    // Display user details
    profileDetails.innerHTML = `
      <p>Name: ${user.name}</p>
      <p>Email: ${user.email}</p>
    `;
  } else {
    // Show signup page
    signupPage.style.display = 'block';
  }
});
