document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("login-form");
  const loginUsername = document.getElementById("login-username");
  const loginPassword = document.getElementById("login-password");
  const togglePasswordIcons = document.querySelectorAll(".toggle-password");
  const forgotLink = document.getElementById("forgot-credentials-link");

  // Toggle password visibility functionality.
  togglePasswordIcons.forEach(icon => {
    icon.addEventListener("click", () => {
      const input = icon.parentElement.querySelector("input");
      if (input.type === "password") {
        input.type = "text";
        icon.innerHTML = '<i class="fa-solid fa-eye-slash"></i>';
      } else {
        input.type = "password";
        icon.innerHTML = '<i class="fa-solid fa-eye"></i>';
      }
    });
  });

  // Login form submission event.
  form.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent default page reload.
    const validUsername = validateLoginUsername();
    const validPassword = validateLoginPassword();

    if (validUsername && validPassword) {
      // Retrieve stored registration data from localStorage.
      const storedUserData = localStorage.getItem("userData");
      if (storedUserData) {
        const userData = JSON.parse(storedUserData);
        // Compare entered inputs with stored registration details.
        if (
          loginUsername.value.trim() === userData.username &&
          loginPassword.value === userData.password
        ) {
          alert("Login successful!");
          // Optionally, redirect to a dashboard page.
          // window.location.href = "dashboard.html";
          form.reset();
          clearAllErrors();
        } else {
          // If credentials do not match, show an error for each.
          showInvalidLoginError();
        }
      } else {
        alert("No registered user found. Please register first.");
      }
    }
  });

  // Real-time validation on login inputs.
  loginUsername.addEventListener("input", validateLoginUsername);
  loginPassword.addEventListener("input", validateLoginPassword);

  // Event handler for "Forgot Username/Password".
  forgotLink.addEventListener("click", (e) => {
    e.preventDefault();
    // Prompt the user to enter their registered email.
    const enteredEmail = prompt("Please enter your registered email:");
    if (!enteredEmail) return; // if user cancels prompt, exit.
    
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      if (enteredEmail.trim() === userData.email) {
        // For demonstration only: display the stored credentials.
        // (In production, do not reveal passwords. Instead, use a secure reset flow.)
        alert(`Your Username: ${userData.username}\nYour Password: ${userData.password}`);
      } else {
        alert("The email entered does not match our records. Please try again.");
      }
    } else {
      alert("No registration data found. Please register first.");
    }
  });

  // Validate username field.
  function validateLoginUsername() {
    if (loginUsername.value.trim() === "") {
      setError(loginUsername, "Username is required");
      return false;
    } else {
      clearError(loginUsername);
      return true;
    }
  }

  // Validate password field.
  function validateLoginPassword() {
    if (loginPassword.value.trim() === "") {
      setError(loginPassword, "Password is required");
      return false;
    } else {
      clearError(loginPassword);
      return true;
    }
  }

  // Display an error message for an input.
  function setError(input, message) {
    const errorDisplay = input.parentElement.querySelector(".error-message");
    errorDisplay.textContent = message;
    input.style.borderColor = "red";
  }

  // Clear error message for an input.
  function clearError(input) {
    const errorDisplay = input.parentElement.querySelector(".error-message");
    errorDisplay.textContent = "";
    input.style.borderColor = "#ddd";
  }

  // Clear errors on all login inputs.
  function clearAllErrors() {
    clearError(loginUsername);
    clearError(loginPassword);
  }

  // Display a common "Invalid login credentials" error on both username and password.
  function showInvalidLoginError() {
    setError(loginUsername, "Invalid login credentials");
    setError(loginPassword, "Invalid login credentials");
  }
});