// JS code for the LOGIN process
const loginFormHandler = async (event) => {
    event.preventDefault();

    // grab user input
    const username = document.querySelector("#name-login").value.trim();
    const password = document.querySelector("#password-login").value.trim();
  
    if (username && password) {
      const response = await fetch("/api/users/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
      });
  
      // if inputs are valid, take user to homepage
      if (response.ok) {
        document.location.replace("/homepage");
      } else {
        alert(response.statusText);
      }
    }
  };
  
  document
    .querySelector(".login-form")
    .addEventListener("submit", loginFormHandler);
  