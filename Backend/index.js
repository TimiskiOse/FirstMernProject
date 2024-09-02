import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import booksRoute from './routes/booksRoute.js'
import cors from 'cors';

const app = express();

//Midleware for parsing request body
app.use(express.json());

//Middleware to handle CORS policy
//app.use(
//   cors({
//       origin: 'http://localhost:3000',
//       methods: [ 'GET', 'POST', 'PUT', 'DELETE' ],
//        allowedHeaders: ['Content-Type']
//    })
//);

// Use the cors middleware
app.use(cors());


//Middleware to use bookroute
app.use('/books', booksRoute );

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('Connected to MongoDB');


        app.listen(PORT, () =>{
            console.log(`Server is running on port ${PORT}`)
        });
        
    })
    .catch((err) =>{
        console.log('Error connecting to MongoDB')
    })