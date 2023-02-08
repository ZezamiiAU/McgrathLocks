const signupButton = document.getElementById("signupButton")
signupButton.addEventListener("click", signup)

async function signup(event) {
    event.preventDefault()
    event.stopPropagation()
    const displayName = signupName.value
    const company = signupCompany.value
    const email = signupEmail.value
    const phone = signupPhone.value
    const password = signupPassword.value

    const errorManager = {
        createUserError: "",
        signinUserError: "",
        firestoreUserError: ""
    }
    console.log(errorManager)

    // Validate input fields
    if (!displayName || !company || !email || !phone || !password) {
        alert("All fields are required. Please fill in all the details.")
        return
    }

    if (!displayName) {
        window.alert("Please enter your name.")
        return
    } else if (!company) {
        window.alert("Please enter your company.")
        return
    } else if (!email) {
        window.alert("Please enter your email address.")
        return
    } else if (!/^\d+$/.test(phone)) {
        window.alert("Phone number should only contain numbers.")
        return
    } else if (!password || password.length < 8 || password.length > 15) {
        window.alert("Password should be between 8 to 15 characters long.")
        return
    } else if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,15}$/.test(password)) {
        window.alert("Password should contain at least 1 letter, 1 number, and 1 special character.")
        return
    }

    // Check if email already exists
    const emailCheck = await firebase
        .auth()
        .fetchSignInMethodsForEmail(email)
        .then((methods) => {
            if (methods.length > 0) {
                return false
            }
            return true
        })
        .catch((error) => {
            console.error(error)
        })

    if (!emailCheck) {
        window.alert("Email address already exists.")
        return
    }

    // Create a user under Authentication.
    await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .catch((error) => {
            errorManager.createUserError = error
        })

    // If no error then create the user under firestore.
    if (errorManager.createUserError === "") {
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
                .then(function (e) {
                    console.log(user.uid)
                })
                .catch((e) => {
                    errorManager.firestoreUserError = e
                })
        } else {
            errorManager.signinUserError = user
        }
    }

    // Check if there was any error
    if (errorManager.createUserError || errorManager.signinUserError || errorManager.firestoreUserError) {
        alert("Please Agree To Terms Of Service Before Continuing")
        console.log("Error manager", errorManager)
        return
    }

    // Redirect to dashboard on success
    alert("Sign up successful!")
    window.location.replace("./integration")
}
