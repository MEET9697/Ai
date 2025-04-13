// Import the necessary modules
const express = require('express');
const axios = require('axios');  // To make requests to OpenAI API

// Initialize the Express app
const app = express();
const port = 5000; // You can use any port that is not in use

// Middleware to handle JSON body data
app.use(express.json());

// Route to handle the code debugging request
app.post('/api/debug', async (req, res) => {
    const { code } = req.body; // Get the code sent from the frontend

    try {
        // Send the code to OpenAI's GPT model for debugging
        const response = await axios.post('https://api.openai.com/v1/completions', {
            model: 'text-davinci-003',  // The GPT model you want to use
            prompt: `Fix the following code: ${code}`, // The prompt for debugging
            max_tokens: 500,  // Maximum tokens to be returned
        }, {
            headers: {
                'Authorization': `Bearer YOUR_OPENAI_API_KEY`,  // Your OpenAI API key
            }
        });

        // Extract the debugged code from the API response
        const debuggedCode = response.data.choices[0].text;

        // Send the debugged code back to the frontend
        res.json({ debuggedCode });
    } catch (error) {
        // In case of an error, send an error message
        console.error('Error during debugging:', error);
        res.status(500).json({ error: 'Error debugging the code' });
    }
});

// Start the server and listen for requests
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
