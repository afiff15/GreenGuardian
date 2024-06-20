const { initializeApp } = require('firebase/app');
const { getFirestore, doc, setDoc, getDoc } = require('firebase/firestore');
const { getAuth, signInWithEmailAndPassword } = require('firebase/auth');

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCYjEcwrTOBQephvwmXvcINvUh7mZl20LU",
    authDomain: "greenguardian-426110.firebaseapp.com",
    projectId: "greenguardian-426110",
    storageBucket: "greenguardian-426110.appspot.com",
    messagingSenderId: "298148258574",
    appId: "1:298148258574:web:802c24924ce1ba2edaed5f",
    measurementId: "G-E9XYPHKGGD"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Get Firestore service
const auth = getAuth(app); // Get Auth service

// Register User
exports.registUser = async (req, h) => {
    const { email, name, uid } = req.payload;
    if (!email || !name) {
        return h.response({ message: "Email and name are required!" }).code(400);
    }
    
    const userRef = doc(db, "users", uid);
    try {
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
            return h.response({ message: "User already exists, login successful" }).code(200);
        }

        await setDoc(userRef, {
            email: email,
            name: name
        });
        return h.response({ message: "User registered successfully" }).code(200);
    } catch (error) {
        return h.response({ message: error.message }).code(500);
    }
};

// Login User
exports.loginUser = (req, h) => {
    const { email, password } = req.payload;
    if (!email || !password) {
        return h.response({ message: "Email and password are required!" }).code(400);
    }

    return signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            return userCredential.user.getIdToken().then(idToken => {
                return h.response({
                    message: "User logged in successfully",
                    userId: userCredential.user.uid,
                    idToken: idToken,
                    refreshToken: userCredential.user.refreshToken,
                    displayName: userCredential.user.displayName
                }).code(200);
            });
        })
        .catch((error) => {
            return h.response({ message: error.message }).code(500);
        });
};