// Login Function
var loginButton = document.getElementById("loginButton");
loginButton.addEventListener("click", function (e) {
  e.preventDefault();
  authenticate();
});

function authenticate() {
  const emailInput = document.getElementById("loginEmail").value;
  const passwordInput = document.getElementById("loginPassword").value;

  if (!emailInput || !passwordInput) {
    document.getElementById("loginErrorMessage").innerHTML =
      "Email or Password is missing.";
    return;
  }

  firebase
    .auth()
    .signInWithEmailAndPassword(emailInput, passwordInput)
    .then((s) => {
      var idRef = db
        .collection("users")
        .get()
        .then((s) => {
          console.log(s);
        });
      return s;
    })
    .then(function (user) {
      console.log(user.user.uid);
      user.user.getIdToken().then((t) => {
        console.log(t);
      });
    })
    .catch(function (error) {
      console.log(error);
      loginErrors.forEach(function (el) {
        el.innerText = error.message;
        el.style.display = "block";
      });
    });
}
