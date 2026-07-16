const firebaseConfig = {
  apiKey: "AIzaSyD3ZRug18s1DcKqAV5DP8Re1xFQMIhlGW8",
  authDomain: "chopperian1.firebaseapp.com",
  projectId: "chopperian1",
  storageBucket: "chopperian1.firebasestorage.app",
  messagingSenderId: "593484892850",
  appId: "1:593484892850:web:6d7b9a93987b4b0e26d7ab"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

db.enablePersistence({ synchronizeTabs: true }).catch(() => {});
