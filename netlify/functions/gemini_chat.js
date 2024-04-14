

const {GoogleGenerativeAI} = require('@google/generative-ai')


exports.handler = async function(event ,context) {

    const GOOGLE_API_KEY = "AIzaSyDMDjSzsuRKGk3q0XrtiSpr03ZlJGou1Yo";
    const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});

    const eventBody = JSON.parse(event.body)
    console.log("got request to chat")
    console.log("history ,"+event.history)

    try{
        const chat = model.startChat(
            {
                history:eventBody.history,
        });

        const msg = eventBody.question;
        const result = await chat.sendMessage(msg);
        const response = await result.response;
        const text = response.text();
        console.log("Got the chat response")
        console.log(text);
        console.log(chat.getHistory());
        return{
            statusCode:200,
            body: JSON.stringify( response )
        }

    }
    catch(error)
    {
        console.log("error here in function catch")
        return{
            statusCode:404,
            body : JSON.stringify(JSON.stringify(error))
        }
    }

}
 