import express from "express";
import {PORT} from "./config.js";
import cors from 'cors';
import geminiRoute from './routes/geminiRoute.js';

const app = express();

//Middleware for parsing request body
app.use(express.json());

//Middleware for handling CORS Policy
app.use(cors());

app.get('/', (request, response) => {
    return response.status(234).send('Welcome to GeminiChatbot Environment');
});

app.use('/gemini', geminiRoute);

app.listen(PORT, () => {
    console.log(`Server is listening to port ${PORT}`);
})