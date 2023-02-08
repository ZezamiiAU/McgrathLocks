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
        measurementId: "G-3JX478JX8X"
    }
}
// initialise firebase Auth & Firestore
firebase.initializeApp(webFlowAuth.firebaseConfig)
const db = firebase.firestore()

// Finalising the global config.

var logoutButton = document.getElementById("logoutButton")

function handleSignOut() {
    window.location.replace("./log-in")
    // Sign-out successful.
}

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        var uid = user.uid
        console.log(uid, user)
    } else {
        console.log("not logged in!")
    }
})
if (logoutButton) {
    logoutButton.addEventListener("click", handleSignOut)
}
