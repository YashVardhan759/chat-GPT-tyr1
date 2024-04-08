// Serverless Function (Node.js)
// const { google } = require('googleapis');

exports.handler = async () => {

  const prompt = "hello. suggest me some hindi movies"
  const apiKey = "";

  const gemini = google.discovery(
    {
    apiVersion: 'v1',
    url: 'https://language.googleapis.com',
  });

  try {
    const response = await gemini.projects().locations().models().documents().generateText({
      parent: `projects/${projectId}/locations/global/models/${modelId}`,
      requests: [{ prompt: prompt }],
      key: apiKey,
    });

    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } 

  catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to generate response' }),
    };
  }

};
