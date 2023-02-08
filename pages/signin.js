// Login Function
const loginButton = document.getElementById("loginButton2")
console.log(loginButton)
loginButton.addEventListener("click", function (e) {
    console.log("button clicked!")
    e.preventDefault()
    e.stopPropagation()
    authenticate()
})

function authenticate() {
    const emailInput = document.getElementById("LoginEmail").value
    const passwordInput = document.getElementById("LoginPassword").value

    const errorMessage = document.getElementById("loginErrorMessage")

    if (!emailInput || !passwordInput) {
        errorMessage.innerHTML = "Email or Password is missing."
        return
    }

    firebase
        .auth()
        .signInWithEmailAndPassword(emailInput, passwordInput)
        .then(function ({ user }) {
            if (user) {
                user.getIdToken().then((t) => {
                    console.log("token: ", t)
                })
                window.location.replace("./integration")
            } else {
                errorMessage.innerHTML = "Something Went Wrong, Please Try Again"
            }
        })
        .catch(function (error) {
            errorMessage.innerHTML = error.message
        })
}
