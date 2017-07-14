import firebase from "firebase"

let config = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DATABASE_URL,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID
};
try {
    firebase.initializeApp(config);
}
catch (e) {

}

export const GithubProvider = new firebase.auth.GithubAuthProvider()
export const FacebookProvider = new firebase.auth.FacebookAuthProvider()
export const TwitterProvider = new firebase.auth.TwitterAuthProvider()
export const firebaseRef = firebase.database().ref().child("users")
export default firebase