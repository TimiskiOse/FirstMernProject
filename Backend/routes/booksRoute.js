import express from 'express';
import { Book } from '../models/bookModel.js';

const router = express.Router();
//Route to save a new book
router.post('/', async (req, res) => {
    try {
        if (
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ) {
            return res.status(400).send({ message: "Please fill in all fields" });
        }

        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
        };

        const book = await Book.create(newBook);

        return res.status(200).json(book);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});


//Route to get all books from db
router.get('/', async (req,res) =>{
    try {
        const books = await Book.find({});

        return res.status(200).json({
            count: books.length,
            data: books
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

//Route to get book from db by id
router.get('/:id', async (req,res) =>{
    try {
        const { id } = req.params;
        const book = await Book.findById(id);


        return res.status(200).json(book);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});


//Route to edit/update book in db
router.put('/:id', async (req,res) =>{
    try {
        if(
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
           ) { 
            return res.status(400).send({ message: "Please fill in all fields" }); 
        }
        
        const { id } = req.params;

        const result = await Book.findByIdAndUpdate(id, req.body);
        if (!result) {
            return res.status(404).json({ message: "Book not found" });
        } 
        return res.status(200).json({message: 'Book updated successfully'});
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

//Route to delete a book from db
router.delete('/:id', async (req,res) => {
  try {
    const { id } = req.params;

    const result = await Book.findByIdAndDelete(id);
    if (!result) {
        return res.status(404).json({ message: "Book not found" });
    } 
    return res.status(200).json({message: 'Book deleted successfully'});
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message})
  }  
});

export default router;
