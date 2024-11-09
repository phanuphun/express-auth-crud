import express from 'express';
import bookCt from '../controller/book.controller';
import uploads from '../utils/upload';

const router = express.Router();

router.get('/getBook', bookCt.getBooks);
router.post('/addBook', uploads.upload, bookCt.addBook);

export { router as bookRoute };
