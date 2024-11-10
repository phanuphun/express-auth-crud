import express from 'express';
import bookCt from '../controller/book.controller';
import uploads from '../utils/upload';

const router = express.Router();

router.get('/getBooks', bookCt.getBooks);
router.post('/addBook', uploads.upload, bookCt.addBook);
router.post('/updateBook', uploads.upload, bookCt.updateBook);
router.delete('/deleteBook/:id', bookCt.deleteBook);

export { router as bookRoute };
