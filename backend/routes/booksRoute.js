import express from 'express'
import {Book} from '../models/bookModel.js'

const router = express.Router()

//save a new book
router.post('/', async (request, response) => {
    try {
        if(!request.body.title || !request.body.author || !request.body.publishYear) {
            return response.status(400).send({
                message: "Send required fields!"
            })
        }
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        };
        const book = await Book.create(newBook)

        return response.status(201).send(book)
    } catch(err) {
        console.log(err.message)
        response.status(500).send({message: err.message})
    }
})

//get all books
router.get('/', async (request, response) => {
    try {
        const books = await Book.find({})
        return response.status(200).json({
            count: books.length,
            data: books
        })
    } catch(err) {
        console.log(err.message)
        response.status(500).send({message: err.message})
    }
})

//get 1 book by id
router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params
        const book = await Book.findById(id)
        return response.status(200).json(book)
    } catch(err) {
        console.log(err.message)
        response.status(500).send({message: err.message})
    }
})

//update a book
router.put('/:id', async (request, response) => {
    try {
        if(!request.body.title || !request.body.author || !request.body.publishYear) {
            return response.status(400).send({
                message: "Send required fields!"
            })
        }

        const { id } = request.params
        const result = await Book.findByIdAndUpdate(id, request.body)

        if(!result) {
            return response.status(404).json({message: "Book not found!"})
        } else {
            return response.status(200).send({
                message: "Book updated successfully!"
            })
        }
    } catch(err) {
        console.log(err.message)
        response.status(500).send({message: err.message})
    }
})

//delete a book
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params
        const result = await Book.findByIdAndDelete(id)

        if(!result) {
            return response.status(404).json({message: "Book not found!"})
        } else {
            return response.status(200).send({
                message: "Book deleted successfully!"
            })
        }
    } catch(err) {
        console.log(err.message)
        response.status(500).send({message: err.message})
    }
})

export default router
