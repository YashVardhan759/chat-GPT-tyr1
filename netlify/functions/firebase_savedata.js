const { initializeApp } = require('firebase/app')
const { getDatabase ,set ,ref } = require("firebase/database")


exports.handler = async function(event ,context) {

    const eventBody = JSON.parse(event.body)
    que = eventBody.question
    ans = eventBody.answer
    console.log("got query")
    console.log(que)
    console.log(ans)

    try{

        const firebaseConfig = {
            databaseURL: "https://gen-ai-api-8d658-default-rtdb.firebaseio.com",
          };
        const app = initializeApp(firebaseConfig);
        const database = getDatabase(app);
        set(ref(database, 'users/'+"user0/"+que), {
          answer:ans
        });

        return{
            statusCode:200,
            body: JSON.stringify( "Success" )
        }

    }
    catch(error)
    {
        return{
            statusCode:500,
            body : JSON.stringify(String(error))
        }
    }
}