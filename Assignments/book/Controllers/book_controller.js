
import BookModel from "../Models/book_model.js"
// Add a new book   
export const addBook = async (req, res) => {
    try {
        const { title, author, genre, publishedYear } = req.body
        if (!title || !author)
            throw new Error("Invalid request")
        const result = await BookModel.insertOne(
            { title, author, genre, publishedYear }
        )
        res.status(201).json({
            success: true,
            message: "Added New Book successfully",
            data: result
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all books
export const getAllBooks = async (req, res) => {
    try {
        const result = await BookModel.find({})
        res.status(200).json({
            success: true,
            message: "successful",
            data: result
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update book details
export const updateBook = async (req, res) => {
    try {
        const id = req.params.id;
        const { title, author, genre, publishedYear } = req.body
        if (!title || !author)
            throw new Error("Invalid request")
        const result = await BookModel.findByIdAndUpdate(id, { title, author, genre, publishedYear }, { new: true });
        if (!result) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json({
            success: true,
            message: "Added New Book successfully",
            data: result
        })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a book by ID
export const deleteBook = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await BookModel.findOneAndDelete(id);
        if (!result) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json({
            success: true,
            message: "Added New Book successfully",
            data: result
        })

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};