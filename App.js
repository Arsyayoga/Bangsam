import banksampahku from './src';
const firebase = require("firebase");

let config = {
    apiKey: "AIzaSyCiwhyJvHITEeaZ6-84VTJOLrc1aW9bhr0",
    authDomain: "kurusreact1.firebaseapp.com",
    databaseURL: "https://kurusreact1.firebaseio.com",
    projectId: "kurusreact1",
    storageBucket: "kurusreact1.appspot.com",
    messagingSenderId: "177592630589"
};
firebase.initializeApp(config);
global.firebase = firebase
export default banksampahku