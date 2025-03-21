document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");

  // Load stored data from localStorage
  nameInput.value = localStorage.getItem("name") || "";
  emailInput.value = localStorage.getItem("email") || "";
  messageInput.value = localStorage.getItem("message") || "";

  // Track if user has interacted with a field
  let interactedFields = {
    name: false,
    email: false,
    message: false,
  };

  // Function to validate input fields
  function validateInput(input, pattern = null, errorMessage = "This field is required!", forceShow = false) {
    let error = input.nextElementSibling;

    if (!error || !error.classList.contains("error-message")) {
      console.warn(`Error message span not found for ${input.id}`);
      return false;
    }

    // Show error if user has interacted or when forceShow is true (on form submit)
    if (interactedFields[input.id] || forceShow) {
      if (!input.value.trim()) {
        error.textContent = errorMessage;
        error.style.opacity = "1"; // Show error
        return false;
      } else if (pattern && !pattern.test(input.value)) {
        error.textContent = errorMessage;
        error.style.opacity = "1"; // Show error
        return false;
      }
    }

    // Hide error message when valid
    error.textContent = "";
    error.style.opacity = "0";
    return true;
  }

  // Save input values in localStorage
  function saveToLocalStorage(input) {
    localStorage.setItem(input.id, input.value);
  }

  // Handle input changes
  function handleInput(input) {
    saveToLocalStorage(input);
    interactedFields[input.id] = true; // Mark field as interacted
    validateInput(input); // Validate while typing
  }

  nameInput.addEventListener("input", function () {
    handleInput(nameInput);
  });

  emailInput.addEventListener("input", function () {
    handleInput(emailInput);
  });

  messageInput.addEventListener("input", function () {
    handleInput(messageInput);
  });

  // Validate on blur **only if the user has typed something**
  nameInput.addEventListener("blur", function () {
    if (interactedFields.name) validateInput(nameInput);
  });

  emailInput.addEventListener("blur", function () {
    if (interactedFields.email) validateInput(emailInput, /^[^ ]+@[^ ]+\.[a-z]{2,6}$/, "Enter a valid email!");
  });

  messageInput.addEventListener("blur", function () {
    if (interactedFields.message) validateInput(messageInput);
  });

  // Form submission validation
  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission if invalid

    let isValid = true;
    isValid = validateInput(nameInput, null, "This field is required!", true) && isValid;
    isValid = validateInput(emailInput, /^[^ ]+@[^ ]+\.[a-z]{2,6}$/, "Enter a valid email!", true) && isValid;
    isValid = validateInput(messageInput, null, "This field is required!", true) && isValid;

    if (isValid) {
      alert("Form submitted successfully!");

      // Clear form and remove local storage data
      localStorage.removeItem("name");
      localStorage.removeItem("email");
      localStorage.removeItem("message");
      form.reset();

      // Reset interaction tracking
      interactedFields = { name: false, email: false, message: false };
    }
  });
});
