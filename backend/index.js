import express from "express";
import {PORT, mongoDBURL, GEMINI_API_KEY} from "./config.js";
import mongoose from "mongoose";
import cors from 'cors';
import {Book} from "./models/bookModel.js";
import booksRoute from './routes/booksRoute.js';
import geminiRoute from './routes/geminiRoute.js';
// import { GoogleGenerativeAI } from "@google/generative-ai";

// require('dotenv').config()
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
// const genAI = new GoogleGenerativeAI(GEMINI_API_KEY)


const app = express();

//Middleware for parsing request body
app.use(express.json());

//Middleware for handling CORS Policy
app.use(cors());

app.get('/', (request, response) => {
    // console.log(request);
    return response.status(234).send('Welcome to Book Store App');
});

app.use('/books', booksRoute);

app.use('/gemini', geminiRoute);

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log("App connected to database");

        app.listen(PORT, () => {
            console.log(`Server is listening to port ${PORT}`);
        })
    })
    .catch((error) => {
        console.log(error);
    })
