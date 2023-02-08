const signupButton = document.getElementById("signupButton")
const errorMessage = document.getElementById("signupErrorMessage")
const email = document.getElementById("signupEmail").value
const displayName = document.getElementById("signupName").value
const company = document.getElementById("signupCompany").value
const phone = document.getElementById("signupPhone").value
const password = document.getElementById("signupPassword").value
signupButton.addEventListener("click", signup)

async function signup(event) {
    event.preventDefault()
    event.stopPropagation()

    // Validate input fields
    if (!displayName || !company || !email || !phone || !password) {
        errorMessage.innerHTML = "Please enter all required fields."
        return
    } else if (!/^\d+$/.test(phone)) {
        errorMessage.innerHTML = "Phone number should only contain numbers."
        return
    } else if (!password || password.length < 8 || password.length > 15) {
        errorMessage.innerHTML = "Password should be between 8 to 15 characters long."
        return
    } else if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,15}$/.test(password)) {
        errorMessage.innerHTML = "Password should contain at least 1 letter, 1 number, and 1 special character."
        return
    }

    const errorManager = {
        createUserError: null,
        signinUserError: null,
        firestoreUserError: null
    }

    // Check if email already exists
    // const emailCheck = await firebase
    //     .auth()
    //     .fetchSignInMethodsForEmail(email)
    //     .then((methods) => {
    //         if (methods.length > 0) {
    //             return false
    //         }
    //         return true
    //     })
    //     .catch((error) => {
    //         console.error(error)
    //     })

    // if (!emailCheck) {
    //     errorMessage.innerHTML = "Email address already exists."
    //     return
    // }

    // Create a user under Authentication.
    await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .catch((error) => {
            errorManager.createUserError = error
        })

    // If no error then create the user under firestore.
    if (errorManager.createUserError !== null) {
        // Login the newly created user.
        const user = await firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(async (u) => u.user)
            .catch((e) => e)

        // set the user in firestore
        if (user.uid) {
            const obj = {
                displayName: displayName,
                company: company,
                phone: phone,
                userID: user.uid
            }

            db.collection("users")
                .doc(user.uid)
                .set(obj)
                .catch((e) => {
                    errorManager.firestoreUserError = e
                })
        } else {
            errorManager.signinUserError = user
        }
    }

    // Check if there was any error
    if (errorManager.createUserError || errorManager.signinUserError || errorManager.firestoreUserError) {
        errorMessage.innerHTML =
            errorManager.createUserError || errorManager.signinUserError || errorManager.firestoreUserError
        return
    }

    window.location.replace("./integration")
}
