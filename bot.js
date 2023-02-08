
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

const submitForm = async (e) => {
    e.preventDefault();
    // Get values
    var name = getInputVal('botName').replace(/\s/g,'-').toLowerCase();
    var des = getInputVal('botDes');
    var type = getInputVal('types');
    var prompt = getInputVal('botprompt')
    var storage = firebase.storage();
    var file=document.getElementById("files").files[0];
    var storageref=storage.ref();
    var thisref=storageref.child(type).child(file.name).put(file);
    thisref.on('state_changed',function(snapshot) {
   
   
    }, function(error) {
    
   }, function() {
    // Uploaded completed successfully, now we can get the download URL
    thisref.snapshot.ref.getDownloadURL().then(function(downloadURL) {
      //getting url of image
      document.getElementById("url").value=downloadURL;
    //  alert('uploaded successfully');
     saveMessages(name,des,prompt,downloadURL);
     });
    });
    var url = getInputVal('url');

   // saveMessages(name,des);
    //   enable alert
    setTimeout(() => {
  document.querySelector(".alert").style.display = "block";
    }, 30000);
  //   remove the alert
  setTimeout(() => {
    document.querySelector(".alert").style.display = "none";
  }, 31500);
    document.getElementById('botform').reset();
   // console.log(name,des,downloadURL)
      }

document.getElementById('botform')
    .addEventListener('submit',submitForm);


// Function to get form values
function getInputVal(id) {
    return document.getElementById(id).value;
}

// Save message to firebase
const saveMessages = (name,des,prompt,downloadURL) => {
    var newContactForm = messagesRef.push();
  
    newContactForm.set({
      name: name,
      description: des,
      imageurl:downloadURL,
      prompt:prompt,
     // msgContent: msgContent,
    });
  };

  
  //Reading database
  var database = firebase.database();

  database.ref().child('botform').once('value', function(snapshot) {
    if (snapshot.exists()) {

      var content = '';

      snapshot.forEach(function(child) {

        var val = child.val();
       // const dbref = database.ref("/botform/" + child.key);
        const ikey = child.key;
      //  dbref.remove();
       // console.log(dbref)
          //key.remove()
      
       // console.log(key)
       // content += '<tr>';
      //  content += '<td>' + val.name + '</td>';
       // content += '<td>' + val.description + '</td>';
        content += `<tr id='${ikey}'><td><a href="https://bot-six-delta.vercel.app/${val.name.toLowerCase()}/${val.name.toLowerCase()}.html" target="_blank">${val.name}</a></td><td>${val.description}</td><td><a href=${val.imageurl} target="_blank"><img src=${val.imageurl} width="30" height="30"></img></a><td><button class="w-100 my-2 btn btn-primary btn btn-sm" onclick="function myFunction(){const keyref=database.ref('/botform/' + '${ikey}');keyref.remove();this.hide()} myFunction();">Delete</button></td></tr>`;
      //  content += '</tr>';
      });
  
      $('#bot-table').append(content);
    }
  
});