const { Firestore } = require('@google-cloud/firestore');

const loadHistoryData = async (userId) => {
  const db = new Firestore({
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    projectId: 'greenguardian-426110',
    databaseId: '(default)',
  });

  const predictCollection = db.collection('predictions');

  const snapshot = await predictCollection.where('userId', '==', userId).orderBy('createdAt', 'desc').get();

  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    history: doc.data(),
  }));

  return { data };
};

module.exports = loadHistoryData;