import firebase from 'firebase';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDOVJei5mnNQglghq9lbSrTlaZlz2Sjg6Q",
    authDomain: "my-project-1-1531424931886.firebaseapp.com",
    databaseURL: "https://my-project-1-1531424931886-default-rtdb.firebaseio.com",
    projectId: "my-project-1-1531424931886",
    storageBucket: "my-project-1-1531424931886.appspot.com",
    messagingSenderId: "876271561288",
    appId: "1:876271561288:web:f5f488ca63833bb7ef067d",
    measurementId: "G-XKWLYD0EFQ"
  };

  firebase.initializeApp(firebaseConfig);

  export default firebase;