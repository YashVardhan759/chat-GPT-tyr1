

const {GoogleGenerativeAI} = require('@google/generative-ai')


exports.handler = async function(event ,context) {

    const eventBody = JSON.parse(event.body)
    console.log(eventBody.question)
    const genAI = new GoogleGenerativeAI(process.env.API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});

    try{
        // For text-only input, use the gemini-pro model
        const model = genAI.getGenerativeModel({ model: "gemini-pro"});
        const chat = model.startChat(
            {
                history: 
                    [
                      {
                        role: "user",
                        parts: [{ text: "Hello, I have 2 dogs in my house." }],
                      },
                      {
                        role: "model",
                        parts: [{ text: "Great to meet you. What would you like to know?" }],
                      },
                    ],
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
