var firebaseConfig = {
    apiKey: "AIzaSyArIyFKvHKgy5ZJWFeuDJyLpqd1GApsrrY",
    authDomain: "chatbot-ca9b4.firebaseapp.com",
    databaseURL: "https://chatbot-ca9b4-default-rtdb.firebaseio.com/",
    projectId: "chatbot-ca9b4",
    storageBucket: "chatbot-ca9b4.appspot.com",
    messagingSenderId: "329318236351",
    appId: "1:329318236351:web:4ab6ab3ce70a6899f8860a"
};

firebase.initializeApp(firebaseConfig);

var messagesRef = firebase.database()
    .ref('botform');
 
document.getElementById('botform')
    .addEventListener('submit', submitForm);

function submitForm(e) {
    e.preventDefault();

    // Get values
    var name = getInputVal('botName');
    var des = getInputVal('botDes');

    saveMessage(name, des);
    document.getElementById('botform').reset();
    console.log(name,des)
}

// Function to get form values
function getInputVal(id) {
    return document.getElementById(id).value;
}

// Save message to firebase
function saveMessage(name, des) {
    var newMessageRef = messagesRef.push();
    newMessageRef.set({
        name: botName,
        des: botDes,
    });
}
