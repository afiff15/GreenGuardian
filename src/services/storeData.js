const { initializeApp } = require('firebase/app');
const { getFirestore, doc, setDoc } = require('firebase/firestore');

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
const db = getFirestore(app);

async function storeData(id, data) {
  try {
    const predictDocRef = doc(db, 'predictions', id);
    await setDoc(predictDocRef, data);
    console.log(`Document ${id} written successfully`);
  } catch (error) {
    console.error("Error writing document: ", error);
  }
}

module.exports = storeData;
