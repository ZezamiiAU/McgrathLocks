//Save Button  variables
const enterCredentialsRMS = document.getElementById("rmsCloudButton")
const enterCredentialsTTLOCK = document.getElementById("ttlockButton")
enterCredentialsRMS.addEventListener("click", save)
enterCredentialsRMS.addEventListener("click", save)

//Error Message Variables
const rmsErrorMessage = document.getElementById("rmsErrorMessage")
const ttlockErrorMessage = document.getElementById("ttlockErrorMessage")

//RMS Cloud Credntials Variables
const clientNumberRMS = document.getElementById("clientNumber")
const clientPasswordRMS = document.getElementById("clientPassword")

//TTLock Credentials Variables
const ttlockUser = document.getElementById("ttlockUser")
const ttlockPassword = document.getElementById("ttlockPassword")
const ttlockClientID = document.getElementById("ttlockClientID")
const ttlockSecretKey = document.getElementById("ttlockSecretKey")

if (!clientNumberRMS || !clientPasswordRMS) {
    rmsErrorMessage.innerHTML = "Please enter all required fields."
    return
} else if (!/^\d+$/.test(clientNumberRMS)) {
    errorMessage.innerHTML = "RMS Client Number should only contain numbers."
    return
}

if (!ttlockUser || !ttlockPassword || !ttlockClientID || !ttlockSecretKey) {
    ttlockErrorMessage.innerHTML = "Please enter all required fields."
    return
}

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
