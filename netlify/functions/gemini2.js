// netlify-functions/chat.js

const {GoogleGenerativeAI} = require('@google/generative-ai')

exports.handler = async function(event ,context) {

    const eventBody = JSON.parse(event.body)
    console.log(eventBody.question)
    console.log("hello i am working")
    try{


        console.log("Got the request fine")
// 'AIzaSyDMDjSzsuRKGk3q0XrtiSpr03ZlJGou1Yo'
        const GOOGLE_API_KEY = 'AIzaSyC-Ao1l7gTFGhiyw7eZa6QVB30U16YFtDA' ; // Replace with your actual API key
        const postData = {contents:[{parts:[{text:        eventBody.question      }]}]};
        const response =  await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + GOOGLE_API_KEY, {method: 'POST',headers: {'Content-Type': 'application/json'},body: JSON.stringify(postData)})
        const data = await response.json()

        // console.log("got the response")
        // console.log(data.candidates[0].content.parts[0].text)
        // setOutput(data.candidates[0].content.parts[0].text)

        return{
            statusCode:200,
            body: JSON.stringify(  data.candidates[0].content.parts[0].text )
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
