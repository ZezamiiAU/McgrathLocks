var webFlowAuth = {
  loginPath: "/log-in",
  loginRedirectPath: "/dashboard",
  signupPath: "/sign-up",
  signupRedirectPath: "/dashboard",
  logoutRedirectPath: "/",
  firebaseConfig: {
    apiKey: "AIzaSyASFSsHovAAFE6bKzPt2pprKFa1pF7FzYs",
    authDomain: "zezamiittlockintegration.firebaseapp.com",
    projectId: "zezamiittlockintegration",
    storageBucket: "zezamiittlockintegration.appspot.com",
    messagingSenderId: "399470193827",
    appId: "1:399470193827:web:2da9152802f29d3b9e2316",
    measurementId: "G-3JX478JX8X",
  },
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
// // Firebase Storage Function to connect the application to storage
// const uploadExcelToFirebaseStorage = async (file, storageRef) => {
//   const fileRef = storageRef.child(file.name);
//   try {
//     const snapshot = await fileRef.put(file);
//     console.log("File uploaded to Firebase Storage:", snapshot);
//   } catch (error) {
//     console.error("Error uploading file to Firebase Storage:", error);
//   }
// };

// // Firebase File upload and Error Messages
// const uploadFileSetup = async () => {
//   const uploadFileErrorMessage = document.getElementById(
//     "uploadFileErrorMessage"
//   );
//   const uploadLockID = document.getElementById("lockIdFile");

//   if (uploadLockID.files.length > 0) {
//     const file = uploadLockID.files[0];
//     const storageRef = firebase.storage().ref().child(file.name);
//     await uploadExcelToFirebaseStorage(file, storageRef);

//     uploadFileErrorMessage.style.color = "green";
//     uploadFileErrorMessage.innerHTML = "File Sent Successfully";
//   } else {
//     uploadFileErrorMessage.style.color = "red";
//     uploadFileErrorMessage.innerHTML = "Please Upload A File Before Continuing";
//   }
// };

//Error Messages and Upload Information to Firestore Database for RMSsetup

async function credentialRMSSetup() {
  const rmsErrorMessage = document.getElementById("rmsErrorMessage");
  //RMS Cloud Credentials Variables
  const clientNumberRMS = document.getElementById("clientNumber").value;
  const clientPasswordRMS = document.getElementById("clientPassword").value;

  if (!clientNumberRMS || !clientPasswordRMS) {
    rmsErrorMessage.style.color = "red";
    rmsErrorMessage.innerHTML = "Please enter all required fields.";
    return;
  } else if (!/^\d+$/.test(clientNumberRMS)) {
    rmsErrorMessage.style.color = "red";
    rmsErrorMessage.innerHTML =
      "RMS Client Number should only contain numbers.";
    return;
  }

  const user = await getCurrentUser();
  const obj = {
    //clientID for RMS is required to be a number in Firestore database
    "rms.clientID": Number(clientNumberRMS),
    "rms.clientPassword": clientPasswordRMS,
    "rms.isWebhookSetupComplete": false,
  };

  db.collection("users")
    .doc(user.uid)
    .update(obj)
    .catch(() => {
      rmsErrorMessage.innerHTML = "Something Went Wrong, Please Try Again";
    });
  rmsErrorMessage.style.color = "green";
  rmsErrorMessage.innerHTML = "RMS Cloud Successfully Saved!";
}

// RMS Save Button  variables
const enterCredentialsRMS = document.getElementById("rmsCloudButton");
enterCredentialsRMS.addEventListener("click", credentialRMSSetup);

//Error Messages and Upload Information to Firestore Database for Ttlock Setup

const credentialTTLockSetup = async () => {
  //Error Message Variables

  const ttlockErrorMessage = document.getElementById("ttlockErrorMessage");

  //TTLock Credentials Variables
  const ttlockUser = document.getElementById("ttlockUser").value;
  const ttlockPassword = document.getElementById("ttlockPassword").value;
  const ttlockClientID = document.getElementById("ttlockClientID").value;
  const ttlockSecretKey = document.getElementById("ttlockSecretKey").value;

  if (!ttlockUser || !ttlockPassword || !ttlockClientID || !ttlockSecretKey) {
    ttlockErrorMessage.style.color = "red";
    ttlockErrorMessage.innerHTML = "Please enter all required fields.";
    return;
  }

  const users = await getCurrentUser();
  const object = {
    "ttlock.username": ttlockUser,
    "ttlock.password": md5(ttlockPassword),
    "ttlock.clientID": ttlockClientID,
    "ttlock.clientSecret": ttlockSecretKey,
  };

  db.collection("users")
    .doc(users.uid)
    .update(object)
    .catch(() => {
      ttlockErrorMessage.innerHTML = "Something Went Wrong, Please Try Again";
    });
  ttlockErrorMessage.style.color = "green";
  ttlockErrorMessage.innerHTML = "TTLock Details Successfully Saved!";
};

// const storageRef = firebase.storage().ref()
// // 'file' comes from the Blob or File API
// ref.put(file).then((snapshot) => {
//     console.log("Uploaded a blob or file!")
// })

// const cloudStorage = document.getElementById("")

//TTLock Save Button Variables
const enterCredentialsTTLOCK = document.getElementById("ttlockButton");
enterCredentialsTTLOCK.addEventListener("click", credentialTTLockSetup);

//signout
const logoutButton = document.getElementById("logoutButton");
logoutButton.addEventListener("click", handleSignOut);

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
