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
    
    function handleSubmit(){ async (e) => {
      console.log('hhh')
      e.preventDefault()
    
      const response = await fetch('https://gitlab-service.onrender.com', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        if(response.ok){
          console.log(response)
        }
        else{console.log("No Response from server")}
    }
  }
    
const submitForm = async (e) => {
    e.preventDefault();

    // Get values
    var name = getInputVal('botName');
    var des = getInputVal('botDes');
    var type = getInputVal('types');
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
     saveMessages(name,des,downloadURL);
     });
    });
    var url = getInputVal('url');

   // saveMessages(name,des);
    //   enable alert
  document.querySelector(".alert").style.display = "block";

  //   remove the alert
  setTimeout(() => {
    document.querySelector(".alert").style.display = "none";
  }, 3000);
    document.getElementById('botform').reset();
   // console.log(name,des,downloadURL)
  

   const response = await fetch('https://gitlab-service.onrender.com', {
            method: 'GET',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        if(response.ok){
          console.log(response)
        }
        else{console.log("No Response from server")} 
}

document.getElementById('botform')
    .addEventListener('submit',submitForm);


// Function to get form values
function getInputVal(id) {
    return document.getElementById(id).value;
}

// Save message to firebase
const saveMessages = (name,des,downloadURL) => {
    var newContactForm = messagesRef.push();
  
    newContactForm.set({
      name: name,
      description: des,
      imageurl:downloadURL,
     // msgContent: msgContent,
    });
  };

  
  //Reading database
  var database = firebase.database();

  database.ref('botform').once('value', function(snapshot) {
    if (snapshot.exists()) {
      var content = '';
      snapshot.forEach(function(data) {
        var val = data.val();
       // content += '<tr>';
      //  content += '<td>' + val.name + '</td>';
       // content += '<td>' + val.description + '</td>';
        content += `<tr><td><a href="https://bot-six-delta.vercel.app/${val.name.toLowerCase()}.html" target="_blank">${val.name}</a></td><td>${val.description}</td><td><a href=${val.imageurl} target="_blank"><img src=${val.imageurl} width="30" height="30"></img></a></td></tr>`;
      //  content += '</tr>';
      });
      $('#bot-table').append(content);
    }
  });

