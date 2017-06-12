import firebase from "firebase"

let config = {
    apiKey: "AIzaSyA-o1eU9Gzl4Upi6ElN_Ht-J0T274HrGEY",
    authDomain: "voting-app-f4b9a.firebaseapp.com",
    databaseURL: "https://voting-app-f4b9a.firebaseio.com",
    projectId: "voting-app-f4b9a",
    storageBucket: "voting-app-f4b9a.appspot.com",
    messagingSenderId: "1009460071253"
};
firebase.initializeApp(config);

let firebaseRef = firebase.database().ref()

firebaseRef.set({
    appName: "Pollex",
    isRunning: true,
    user: {
        name: "Ahmed",
        age: 25
    }
}).then(snapshot => {
    console.log("set Worked")

}).catch(e=>e)

// firebaseRef.once("value").then(snapshot => {
//     console.log("Got the entire DB", snapshot.val())
// }, (e)=>e)

let logData =  (snapshot) =>{
    console.log("Got the entire DB", snapshot.val())

}
firebaseRef.on("value", logData)

firebaseRef.off("value")
let pollsRef = firebaseRef.child("polls")
let newPollRef = pollsRef.push({
    title: "What's your nickname"
})

pollsRef.on("child_added", (snapshot) => {
    console.log("Child added", snapshot.key, snapshot.val())
})
pollsRef.on("child_changed", (snapshot) => {
    console.log("Child changed", snapshot.key, snapshot.val())
})

pollsRef.on("child_removed", (snapshot) => {
    console.log("Child removed", snapshot.key, snapshot.val())
})


console.log("New Poll info", newPollRef.key)