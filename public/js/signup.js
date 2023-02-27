const signupFormHandler = async (event) => {
  console.log("signupFormHandler")
  event.preventDefault();
  try {
    const username = document.querySelector("#name-signup").value.trim();
    const password = document.querySelector("#password-signup").value.trim();

    console.log("username: " + username + " password: " + password)
    if (!username || !password) {
      alert("You must provide a username and password.");
      return;
    }

    const response = await fetch("/api/users/signup", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });

    if (!response.ok) {
      alert("Failed to sign up.");
      return;
    }

    document.location.replace("/");
  } catch (error) {
    console.log(error);
  }
};

document
  .querySelector(".signup-form")
  .addEventListener("submit", signupFormHandler);
