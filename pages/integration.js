const credentialRMSSetup = async () => {
    const rmsErrorMessage = document.getElementById("rmsErrorMessage")
    //RMS Cloud Credntials Variables
    const clientNumberRMS = document.getElementById("clientNumber").value
    const clientPasswordRMS = document.getElementById("clientPassword").value

    if (!clientNumberRMS || !clientPasswordRMS) {
        rmsErrorMessage.style.color = "red"
        rmsErrorMessage.innerHTML = "Please enter all required fields."
        return
    } else if (!/^\d+$/.test(clientNumberRMS)) {
        rmsErrorMessage.style.color = "red"
        rmsErrorMessage.innerHTML = "RMS Client Number should only contain numbers."
        return
    }

    const user = await getCurrentUser()
    const obj = {
        //clientID for RMS is required to be a number in Firestore database
        "rms.clientID": Number(clientNumberRMS),
        "rms.clientPassword": clientPasswordRMS,
        "rms.isWebhookSetupComplete": false
    }

    db.collection("users")
        .doc(user.uid)
        .update(obj)
        .catch(() => {
            rmsErrorMessage.innerHTML = "Something Went Wrong, Please Try Again"
        })
    rmsErrorMessage.style.color = "green"
    rmsErrorMessage.innerHTML = "RMS Cloud Successfully Saved!"
}

// RMS Save Button  variables
const enterCredentialsRMS = document.getElementById("rmsCloudButton")
enterCredentialsRMS.addEventListener("click", credentialRMSSetup)

const credentialTTLockSetup = async () => {
    //Error Message Variables

    const ttlockErrorMessage = document.getElementById("ttlockErrorMessage")

    //TTLock Credentials Variables
    const ttlockUser = document.getElementById("ttlockUser").value
    const ttlockPassword = document.getElementById("ttlockPassword").value
    const ttlockClientID = document.getElementById("ttlockClientID").value
    const ttlockSecretKey = document.getElementById("ttlockSecretKey").value

    if (!ttlockUser || !ttlockPassword || !ttlockClientID || !ttlockSecretKey) {
        ttlockErrorMessage.style.color = "red"
        ttlockErrorMessage.innerHTML = "Please enter all required fields."
        return
    }

    const users = await getCurrentUser()
    const object = {
        "ttlock.clientID": ttlockClientID,
        "ttlock.clientSecret": ttlockSecretKey,
        "ttlock.password": ttlockPassword,
        "ttlock.username": ttlockUser
    }

    db.collection("users")
        .doc(users.uid)
        .update(object)
        .catch(() => {
            ttlockErrorMessage.innerHTML = "Something Went Wrong, Please Try Again"
        })
    ttlockErrorMessage.style.color = "green"
    ttlockErrorMessage.innerHTML = "TTLock Details Successfully Saved!"
}

//TTLock Save Button Variables
const enterCredentialsTTLOCK = document.getElementById("ttlockButton")
enterCredentialsTTLOCK.addEventListener("click", credentialTTLockSetup)

//signout
const logoutButton = document.getElementById("logoutButton")
logoutButton.addEventListener("click", handleSignOut)

// const initialSetup = async () => {
//     const user = await getCurrentUser()
//     const token = user.getIdToken().then((t) => t)
//     const myHeaders = new Headers()
//     myHeaders.append("Authorization", `Bearer ${token}`)
//     const requestOptions = {
//         method: "GET",
//         redirect: "follow",
//         headers: myHeaders
//     }

//     fetch("https://mcgrathbackend.zezamii.com/v1/ttlock/locks", requestOptions)
//         .then((response) => response.text())
//         .then((result) => console.log("res", result))
//         .catch((error) => console.log("error", error))
// }

// const myTimeout = setTimeout(() => {
//     console.log("initial Setup function called, Testing")
//     initialSetup()
// }, 10000)
