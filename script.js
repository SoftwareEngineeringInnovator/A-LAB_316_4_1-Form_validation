// 1. Select the form element

const regForm = document.getElementById("registration");

// 2. Add event listener to the (submit) event

regForm.addEventListener("SUBMIT", (event) => {
    // prevent the refreshing of the page
    event.preventDefault();

    //console.log("Check submission")

    // 3. User Information

    const username = document.getElementById("reg-username").value;
    const email = document.getElementById("reg-email").value;
    const password = document.getElementById("reg-password").value;
    const passwordCheck = document.getElementById("reg-passwordCheck").value;

    // console.log("Username value is:", username);
})