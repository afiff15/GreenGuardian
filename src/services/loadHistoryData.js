const { initializeApp } = require('firebase/app');
const { getFirestore, collection, query, where, orderBy, getDocs } = require('firebase/firestore');

// Your Firebase configuration (you may need to replace this with your actual config)
const firebaseConfig = {
  apiKey: "AIzaSyCYjEcwrTOBQephvwmXvcINvUh7mZl20LU",
  authDomain: "greenguardian-426110.firebaseapp.com",
  projectId: "greenguardian-426110",
  storageBucket: "greenguardian-426110.appspot.com",
  messagingSenderId: "298148258574",
  appId: "1:298148258574:web:802c24924ce1ba2edaed5f",
  measurementId: "G-E9XYPHKGGD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const loadHistoryData = async (userId) => {
  try {
    const predictCollection = collection(db, 'predictions');
    const q = query(predictCollection, where('userId', '==', userId), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      history: doc.data(),
    }));

    return { data };
  } catch (error) {
    console.error("Error loading history data: ", error);
    throw error;
  }
};

module.exports = loadHistoryData;
