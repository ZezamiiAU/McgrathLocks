// RMS Save Button  variables
const enterCredentialsRMS = document.getElementById("rmsCloudButton")
enterCredentialsRMS.addEventListener("click", credentialRMSSetup)

const credentialRMSSetup = () => {
    const rmsErrorMessage = document.getElementById("rmsErrorMessage")
    //RMS Cloud Credntials Variables
    const clientNumberRMS = document.getElementById("clientNumber")
    const clientPasswordRMS = document.getElementById("clientPassword")

    if (!clientNumberRMS || !clientPasswordRMS) {
        rmsErrorMessage.innerHTML = "Please enter all required fields."
        return
    } else if (!/^\d+$/.test(clientNumberRMS)) {
        errorMessage.innerHTML = "RMS Client Number should only contain numbers."
        return
    }

    const obj = {
        "rms.clientID": clientNumberRMS,
        "rms.clientPassword": clientPasswordRMS,
        "rms.isWebhookSetupComplete": false
    }

    db.collection("users")
        .doc(user.id)
        .update(obj)
        .catch((e) => {
            rmsErrorMessage.innerHTML = "Something Went Wrong, Please Try Again"
        })
    rmsErrorMessage.styler.color = "green"
    rmsErrorMessage.innerHTML = "RMS Cloud Successfully Saved!"
}

//TTLock Save Button Variables
const enterCredentialsTTLOCK = document.getElementById("ttlockButton")
enterCredentialsTTLOCK.addEventListener("click", credentialTTLockSetup)

const credentialTTLockSetup = () => {
    //Error Message Variables

    const ttlockErrorMessage = document.getElementById("ttlockErrorMessage")

    //TTLock Credentials Variables
    const ttlockUser = document.getElementById("ttlockUser")
    const ttlockPassword = document.getElementById("ttlockPassword")
    const ttlockClientID = document.getElementById("ttlockClientID")
    const ttlockSecretKey = document.getElementById("ttlockSecretKey")
    const obj = {
        "ttlock.clientID": ttlockClientID,
        "ttlock.clientSecret": ttlockSecretKey,
        "ttlock.password": ttlockPassword,
        "ttlock.username": ttlockUser
    }
}