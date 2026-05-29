function showError(message) {
    const errorDisplay = document.getElementById("errorDisplay");
    errorDisplay.textContent = message;
    errorDisplay.style.display = "flex";

    //console.log(errorDisplay);
}

// Select the form element

const regForm = document.getElementById("registration");

// Add event listener to the (submit) event

regForm.addEventListener("submit", (event) => {
    // prevent the refreshing of the page
    event.preventDefault();

    //console.log("Check submission")

    // User Information

    const username = document.getElementById("reg-username").value;
    const email = document.getElementById("reg-email").value;
    const password = document.getElementById("reg-password").value;
    const passwordCheck = document.getElementById("reg-passwordCheck").value;

    // console.log("Username value is:", username);

    // regForm.addEventListener("submit", (event) => {
    //     event.preventDefault();

        // const username = document.getElementById("reg-username").value;
        

        // User Name Cannot be blank
        if (username.trim() === "") {
            showError("Username cannot be blank.");
            document.getElementById("reg-username").focus();
            return; // Exit the function early so it doesn't continue
        }

        // User Name Must be at least 4 chars long
        if (username.length < 4) {
            showError("Username must be at least 4 characters long.");
            document.getElementById("reg-username").focus();
            return;
        }

        // Must contain at least 2 unique characters
        // We use a 'Set', which automatically removes duplicates
        const uniqueChars = new Set(username);
        if (uniqueChars.size < 2) {
            showError("Username must contain at least 2 unique characters.");
            document.getElementById("reg-username").focus();
            return;
        }

        // Dont use special characters or whitespace - Regex: ^[a-zA-Z0-9]+$ means only letters and numbers allowed
        const regex = /^[a-zA-Z0-9]+$/;
        if (!regex.test(username)) {
            showError("Username cannot contain special characters or whitespace.");
            document.getElementById("reg-username").focus();
            return;
        }

        // console.log("Username is valid:", username);

        // Validate user email
        const email = document.getElementById("reg-email").value;

        // Check email using Regex for email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showError("Please enter a valid email address.");
            document.getElementById("reg-email").focus();
            return;
        }

        // Check for "example.com" domain
        if (email.toLowerCase().endsWith("@example.com")) {
            showError("Email cannot be from the domain 'example.com'.");
            document.getElementById("reg-email").focus();
            return;
        }

        // console.log("Email is valid:", email);


        // Validation of password rules
        const password = document.getElementById("reg-password").value;
        const passwordCheck = document.getElementById("reg-passwordCheck").value;

        // Check password length >= 12
        if (password.length < 12) {
            showError("Password must be at least 12 characters long.");
            document.getElementById("reg-password").focus();
            return;
        }

        // Check password using Regex patterns
        if (!/[A-Z]/.test(password)) {
            showError("Password must contain at least one uppercase letter.");
            document.getElementById("reg-password").focus();
            return;
        }
        if (!/[a-z]/.test(password)) {
            showError("Password must contain at least one lowercase letter.");
            document.getElementById("reg-password").focus();
            return;
        }
        if (!/[0-9]/.test(password)) {
            showError("Password must contain at least one number.");
            document.getElementById("reg-password").focus();
            return;
        }
        if (!/[^A-Za-z0-9]/.test(password)) {
            showError("Password must contain at least one special character.");
            document.getElementById("reg-password").focus();
            return;
        }

        // console.log("Password:", password);


        // The password must not equal password
        if (password.toLowerCase().includes("password")) {
            showError("Password cannot contain the word 'password'.");
            document.getElementById("reg-password").focus();
            return;
        }

        // password must not contain the username
        if (password.toLowerCase().includes(username.toLowerCase())) {
            showError("Password cannot contain the username.");
            document.getElementById("reg-password").focus();
            return;
        }

        // password must match
        if (password !== passwordCheck) {
            showError("Passwords do not match.");
            document.getElementById("reg-passwordCheck").focus();
            return;
        }

        // check if terms and conditions were selected
        const terms = document.getElementById("terms");
        if (!terms.checked) {
            showError("You must accept the Terms of Use.");
            return;
        }

        // console.log("Validation complete. All rules passed!");



        // Add user to localStorage
        const users = JSON.parse(localStorage.getItem("users")) || [];

        // Create the new user object (Simplified)
        const newUser = {
            username: username.toLowerCase(),
            email: email.toLowerCase(),
            password: password
        };
        users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful!");
    regForm.reset();
});