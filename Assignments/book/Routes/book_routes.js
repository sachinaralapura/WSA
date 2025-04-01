import { Router } from "express"
import { addBook, deleteBook, getAllBooks, updateBook } from "../Controllers/book_controller.js";
const router = Router()

router.post('/books', addBook);
router.get('/books', getAllBooks);
router.put('/books/:id', updateBook);
router.delete('/books/:id', deleteBook);


export default router