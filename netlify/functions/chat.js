// netlify-functions/chat.js

exports.handler = async function(event) {

    // if (event.Method !== 'POST') {
    //     return {
    //         statusCode: 404,
    //         body: JSON.stringify({ message: 'Method Not Allowed' })
    //     }
    // }
    // const { message } = JSON.parse(event.body);
    // log.console(mess+"message")

    

    const apiKey = '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';
    try {
        const response = await fetch('https://api.openai.com/v1/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify(
                {
                    "model": "gpt-3.5-turbo",
                    "messages":
                    {
                        "role": "system",
                        "content": "You are ChatGPT, a helpful assistant."
                    }
                })
        });

        const data = await response.json();
        // const botResponse = data.choices[0].text.trim();
        return {
            statusCode: 200,
            body: JSON.stringify({ message: data })
        };
    }
    catch (error) 
    {
        console.log("hjklhjk")
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'The internal error of server' })
        };
    }
}
