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
        .then((s) => {
            var idRef = db
                .collection("users")
                .get()
                .then((s) => {
                    console.log(s)
                })
            return s
        })
        .then(function (user) {
            console.log(user.user.uid)
            user.user.getIdToken().then((t) => {
                console.log("token: ", t)
            })
        })
        .catch(function (error) {
            errorMessage.innerHTML = error.message
        })
}
