const credentialRMSSetup = () => {
    const rmsErrorMessage = document.getElementById("rmsErrorMessage")
    //RMS Cloud Credntials Variables
    const clientNumberRMS = document.getElementById("clientNumber").value
    const clientPasswordRMS = document.getElementById("clientPassword").value

    if (!clientNumberRMS || !clientPasswordRMS) {
        rmsErrorMessage.innerHTML = "Please enter all required fields."
        return
    } else if (!/^\d+$/.test(clientNumberRMS)) {
        console.log(clientNumberRMS)
        rmsErrorMessage.innerHTML = "RMS Client Number should only contain numbers."
        return
    }

    const user = firebase.auth().onAuthStateChanged((user) => user)
    console.log(user)
    const obj = {
        "rms.clientID": clientNumberRMS,
        "rms.clientPassword": clientPasswordRMS,
        "rms.isWebhookSetupComplete": false
    }

    db.collection("users")
        .doc(user.user.id)
        .update(obj)
        .catch((e) => {
            rmsErrorMessage.innerHTML = "Something Went Wrong, Please Try Again"
        })
    rmsErrorMessage.styler.color = "green"
    rmsErrorMessage.innerHTML = "RMS Cloud Successfully Saved!"
}

// RMS Save Button  variables
const enterCredentialsRMS = document.getElementById("rmsCloudButton")
enterCredentialsRMS.addEventListener("click", credentialRMSSetup)

//TTLock Save Button Variables
const enterCredentialsTTLOCK = document.getElementById("ttlockButton")
enterCredentialsTTLOCK.addEventListener("click", credentialTTLockSetup)

const credentialTTLockSetup = () => {
    //Error Message Variables

    const ttlockErrorMessage = document.getElementById("ttlockErrorMessage")

    //TTLock Credentials Variables
    const ttlockUser = document.getElementById("ttlockUser").value
    const ttlockPassword = document.getElementById("ttlockPassword").value
    const ttlockClientID = document.getElementById("ttlockClientID").value
    const ttlockSecretKey = document.getElementById("ttlockSecretKey").value
    const obj = {
        "ttlock.clientID": ttlockClientID,
        "ttlock.clientSecret": ttlockSecretKey,
        "ttlock.password": ttlockPassword,
        "ttlock.username": ttlockUser
    }
}
