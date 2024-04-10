

const {GoogleGenerativeAI} = require('@google/generative-ai')


exports.handler = async function(event ,context) {

    const eventBody = JSON.parse(event.body)
    console.log(eventBody.question)
    const GOOGLE_API_KEY = 'AIzaSyDMDjSzsuRKGk3q0XrtiSpr03ZlJGou1Yo'; 
    const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});

    try{
        // For text-only input, use the gemini-pro model
        const model = genAI.getGenerativeModel({ model: "gemini-pro"});
        const chat = model.startChat(
            {
                history: JSON.stringify(chat.getHistory()) 
                  ,
                generationConfig: 
                {
                  maxOutputTokens: 100,
                },
        });
        
        const msg = eventBody.question;
        const result = await chat.sendMessage(msg);
        const response = await result.response;
        const text = response.text();
        console.log("got chat response")
        console.log(response)
        console.log(text);
        
        return{
            statusCode:200,
            body: JSON.stringify( text )
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
