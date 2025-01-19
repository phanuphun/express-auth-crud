import { PrismaClient } from '@prisma/client';
import { RequestHandler as ReqHandler } from 'express';
import { PrismaClientKnownRequestError as PrismaErr } from '@prisma/client/runtime/library';
import { deleteFile } from '../utils/deleteFile';
import { config } from '../config/config';

const prisma = new PrismaClient();

// get all books
const getBooks: ReqHandler = async (req, res, next) => {
    try {
        const books = await prisma.books.findMany({
            select: {
                id: true,
                title: true,
                image: true,
                category: true,
            },
        });

        books.forEach((book) => {
            book.image = config.imgUrl + book.image;
        });

        res.status(200).send({
            data: books,
            msg: books.length > 0 ? 'Get books successfully' : 'No books',
        });
    } catch (err) {
        next(err);
    }
};

// Insert one book
interface InsertBookBody {
    filename: string
    cId: number
    title: string
}

const addBook: ReqHandler<unknown, unknown, InsertBookBody> = async (req, res, next) => {
    const filename = req.file?.filename;
    const cId = +req.body.cId;
    const title = req.body.title;
    try {
        await prisma.books.create({
            data: {
                title: title,
                categoryId: cId,
                image: filename!,
            },
        });
        res.status(200).send({ msg: 'Add new book successfully' });
    } catch (err) {
        deleteFile(filename!, '/uploads');
        if (err instanceof PrismaErr) {
            if (err.code === 'P2002') {
                err.message = `Can't add new book , This title aready exits.`;
                next(err);
            }
        } else {
            next(err);
        }
    }
};

// Update book

interface UpdateBookBody {
    id: number,
    title: string,
    cId: number,
    filename: string,
}
const updateBook: ReqHandler<unknown, unknown, UpdateBookBody> = async (req, res, next) => {
    const id = +req.body.id;
    const title = req.body.title;
    const cId = +req.body.cId;
    const filename = req.body.filename;
    const newFilename = req.file?.filename;

    try {
        const update = async (file: string) => {
            await prisma.books.update({
                data: {
                    title,
                    categoryId: cId,
                    image: file,
                },
                where: { id },
            });
        };

        if (newFilename) {
            await update(newFilename);
            if (filename) deleteFile(filename, '/uploads');
        } else {
            await update(filename);
        }
        res.status(200).send({ msg: 'Update book successfully' });
    } catch (err) {
        if (err instanceof PrismaErr) {
            if (err.code === 'P2002') {
                err.message = `Can't update new book , This title aready exits.`;
                if (newFilename) deleteFile(newFilename, '/uploads');
                next(err);
            } else {
                next(err);
            }
        } else {
            if (newFilename) deleteFile(newFilename, '/uploads');
            next(err);
        }
    }
};

// Delete Books
const deleteBook: ReqHandler<{ id: number }> = async (req, res, next) => {
    const id = +req.params.id;
    try {
        const book = await prisma.books.findUnique({ where: { id } });
        if (book) {
            await prisma.books.delete({ where: { id } });
            await deleteFile(book.image, '/uploads');
            res.status(200).send({ msg: 'Delete book successfully.' });
        } else {
            res.status(400).send({
                msg: 'Cannot delete , no this book in our system. ',
            });
        }
    } catch (err) {
        next(err);
    }
};

const bookCt = {
    getBooks,
    addBook,
    updateBook,
    deleteBook,
};

export default bookCt;
