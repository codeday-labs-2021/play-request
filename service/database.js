require('dotenv').config()

var firebase = require('firebase');
import 'firebase/storage';

var firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_ID,
    appId: process.env.FIREBASE_APP_ID
};

var fireApp = firebase.initializeApp(firebaseConfig);
var database = firebase.database();
var storage = firebase.storage();

console.log(`Firebase Initialized - Profile: ${firebase.app().name}`);

module.exports = {
    firebase,
    database,
    storage,
    fireApp
}