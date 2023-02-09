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

function handleSignOut() {
    window.location.replace("./log-in")
}
const checkAuthorisation = () => {
    firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
            window.location.replace("./log-in")
        }
    })
}

const getCurrentUser = async () => {
    let user
    await firebase.auth().onAuthStateChanged((u) => {
        user = u
    })
    return user
}
