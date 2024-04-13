
const { initializeApp } = require("https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js");
const { getDatabase  } = require("https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js");



 const firebaseConfig = {
   apiKey: "AIzaSyCrn0DcDZCXiQA-QXzPU3vUJPMM6-HrlEo",
   authDomain: "gen-ai-api-8d658.firebaseapp.com",
   projectId: "gen-ai-api-8d658",
   storageBucket: "gen-ai-api-8d658.appspot.com",
   messagingSenderId: "552344648728",
   appId: "1:552344648728:web:5f155efeaba657887e176d"
 };

//  const app = initializeApp(firebaseConfig);

// function save_in_firebase()
// {
//      var userInput = document.getElementById('userInput').value;
//      db = getDatabase()
//      set(ref(db, 'users/' +"0"), {
//          data: userInput,
//      });
// }



exports.handler = async function() {

    const app = initializeApp(firebaseConfig);

    try{
        var userInput = document.getElementById('userInput').value;
        db = getDatabase()
        set(ref(db, 'users/' +"0"), {
            data: userInput,
        })

    }
    catch(error)
    {
        console.log("error here in function catch firebase")
        return{
            statusCode:404,
            body : JSON.stringify(JSON.stringify(error))
        }
    }


}


