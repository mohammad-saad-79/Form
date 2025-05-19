document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registration-form');
  const username = document.getElementById('username');
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const confirmPassword = document.getElementById('confirm-password');
  const togglePasswordIcons = document.querySelectorAll('.toggle-password');

  // Toggle password visibility for both password fields.
  togglePasswordIcons.forEach((icon) => {
    icon.addEventListener('click', () => {
      const input = icon.parentElement.querySelector('input');
      if (input.type === 'password') {
        input.type = 'text';
        icon.innerHTML = '<i class="fa-solid fa-eye-slash"></i>';
      } else {
        input.type = 'password';
        icon.innerHTML = '<i class="fa-solid fa-eye"></i>';
      }
    });
  });

  // Form submission event.
  form.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent default form submission (page refresh).
    const isValid = validateInputs();
    if (isValid) {
      // Store user registration details in localStorage.
      const userData = {
        username: username.value.trim(),
        email: email.value.trim(),
        password: password.value  // For demo purposes only. Never store plaintext passwords in production!
      };
      localStorage.setItem('userData', JSON.stringify(userData));
      
      alert("Registration successful!");
      // Redirect to the login page.
      window.location.href = "login.html";
      // Optionally, reset the form and clear errors.
      form.reset();
      clearAllErrors();
    }
  });

  // Real-time validation for each input.
  username.addEventListener('input', validateUsername);
  email.addEventListener('input', validateEmail);
  password.addEventListener('input', validatePassword);
  confirmPassword.addEventListener('input', validateConfirmPassword);

  // Validate all input fields.
  function validateInputs() {
    const validUsername = validateUsername();
    const validEmail = validateEmail();
    const validPassword = validatePassword();
    const validConfirm = validateConfirmPassword();
    return validUsername && validEmail && validPassword && validConfirm;
  }

  // Validate username field.
  function validateUsername() {
    if (username.value.trim() === "") {
      setError(username, "Username is required");
      return false;
    } else {
      clearError(username);
      return true;
    }
  }

  // Validate email field using regex.
  function validateEmail() {
    const emailRegex = /^([\w.\-]+)@([\w\-]+)\.([\w]{2,})$/;
    if (email.value.trim() === "") {
      setError(email, "Email is required");
      return false;
    } else if (!emailRegex.test(email.value.trim())) {
      setError(email, "Please enter a valid email");
      return false;
    } else {
      clearError(email);
      return true;
    }
  }

  // Validate password field (minimum length of 8 characters).
  function validatePassword() {
    if (password.value.trim() === "") {
      setError(password, "Password is required");
      return false;
    } else if (password.value.length < 8) {
      setError(password, "Password must have at least 8 characters");
      return false;
    } else {
      clearError(password);
      return true;
    }
  }

  // Validate confirm password field (must match the password).
  function validateConfirmPassword() {
    if (confirmPassword.value.trim() === "") {
      setError(confirmPassword, "Please confirm your password");
      return false;
    } else if (confirmPassword.value !== password.value) {
      setError(confirmPassword, "Passwords do not match");
      return false;
    } else {
      clearError(confirmPassword);
      return true;
    }
  }

  // Display error message for a given input.
  function setError(input, message) {
    const errorDisplay = input.parentElement.querySelector('.error-message');
    errorDisplay.textContent = message;
    input.style.borderColor = "red";
  }

  // Clear error message for a given input.
  function clearError(input) {
    const errorDisplay = input.parentElement.querySelector('.error-message');
    errorDisplay.textContent = "";
    input.style.borderColor = "#ddd";
  }

  // Clear errors for all input fields.
  function clearAllErrors() {
    [username, email, password, confirmPassword].forEach((input) => {
      clearError(input);
    });
  }
});