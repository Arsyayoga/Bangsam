import banksampahku from './src';
const firebase = require("firebase");

let config = {
    apiKey: "AIzaSyAFRMfV5krrNQ_xtWuO88DmEupoTwP0UYw",
    authDomain: "banksampahku-f1ed2.firebaseapp.com",
    databaseURL: "https://banksampahku-f1ed2.firebaseio.com",
    projectId: "banksampahku-f1ed2",
    storageBucket: "banksampahku-f1ed2.appspot.com",
    messagingSenderId: "418028808572"
};
firebase.initializeApp(config);
global.firebase = firebase
export default banksampahku