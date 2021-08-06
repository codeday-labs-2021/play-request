"use strict";

require("firebase/storage");

require("dotenv").config();

var firebase = require("firebase");

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
console.log("Firebase Initialized - Profile: ".concat(firebase.app().name));
module.exports = {
  firebase: firebase,
  database: database,
  storage: storage,
  fireApp: fireApp
};
//# sourceMappingURL=database.js.map