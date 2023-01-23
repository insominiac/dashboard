var firebaseConfig = {
     apiKey: "AIzaSyArIyFKvHKgy5ZJWFeuDJyLpqd1GApsrrY",
  authDomain: "chatbot-ca9b4.firebaseapp.com",
  databaseURL: "https://chatbot-ca9b4-default-rtdb.firebaseio.com",
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
    var engine = getInputVal('engine');

    saveMessages(name, des,engine);
    //   enable alert
  document.querySelector(".alert").style.display = "block";

  //   remove the alert
  setTimeout(() => {
    document.querySelector(".alert").style.display = "none";
  }, 3000);
    document.getElementById('botform').reset();
    console.log(name,des,engine)
}

// Function to get form values
function getInputVal(id) {
    return document.getElementById(id).value;
}

// Save message to firebase
const saveMessages = (name, des,engine) => {
    var newContactForm = messagesRef.push();
  
    newContactForm.set({
      name: name,
      description: des,
      ChatEngine: engine,
     // msgContent: msgContent,
    });
  };
  var database = firebase.database();

  database.ref('botform').once('value', function(snapshot) {
    if (snapshot.exists()) {
      var content = '';
      snapshot.forEach(function(data) {
        var val = data.val();
        content += '<tr>';
        content += '<td>' + val.name + '</td>';
        content += '<td>' + val.description + '</td>';
        content += '<td>' + val.ChatEngine + '</td>';
        content += '</tr>';
      });
      $('#bot-table').append(content);
    }
  });

