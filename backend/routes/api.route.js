import express from 'express';
import axios from 'axios';
const router = express.Router();
const YOUR_GROQ_API_KEY="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"
router.post('/chat', async (req, res) => {
    try {
        const { message } = req.body;
        if (!message) {
            return res.status(400).json({ error: "Message is required" });
        }
        const data = JSON.stringify({
            "messages": [{ "role": "user", "content": message }],
            "model": "llama-3.3-70b-versatile"
        });
        const response = await axios.post('https://api.groq.com/openai/v1/chat/completions', data, {
            headers: {
                'Authorization': `Bearer ${YOUR_GROQ_API_KEY}`,
                'Content-Type': 'application/json'
            },
            maxBodyLength: Infinity
        });
        res.json(response.data);
    } catch (error) {
        console.error("Error communicating with Groq API:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
export default router;
