import { PrismaClient } from '@prisma/client';
import { RequestHandler } from 'express';
import { PrismaClientKnownRequestError as PrismaErr } from '@prisma/client/runtime/library';
import { deleteFile } from '../utils/deleteFile';

const prisma = new PrismaClient();

const getBooks: RequestHandler = async (req, res, next) => {
    try {
        const books = await prisma.books.findMany();
        res.status(200).send({
            data: books,
            msg: books.length > 0 ? 'Get books successfully' : 'No books',
        });
    } catch (err) {
        next(err);
    }
};

const addBook: RequestHandler = async (req, res, next) => {
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

const bookCt = {
    getBooks,
    addBook,
};

export default bookCt;
