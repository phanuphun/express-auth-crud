import { Categories, PrismaClient } from '@prisma/client';
import { RequestHandler } from 'express';
import { PrismaClientKnownRequestError as PrismaErr } from '@prisma/client/runtime/library';

const prisma = new PrismaClient();
const getCategory: RequestHandler = async (req, res, next) => {
    try {
        const categories: Array<Categories> =
            await prisma.categories.findMany();
        res.status(200).send({
            data: categories,
            msg:
                categories.length > 0
                    ? 'Get categories successfully'
                    : 'No Category',
        });
    } catch (e) {
        next(e);
    }
};

const addCategory: RequestHandler = async (req, res, next) => {
    const name = req.body.name;
    try {
        await prisma.categories.create({
            data: {
                name: name,
            },
        });
        res.status(200).send({ msg: 'Add new category successfully' });
    } catch (e) {
        if (e instanceof PrismaErr) {
            if (e.code === 'P2002')
                e.message = 'This category name aready exites.';
            next(e);
        } else {
            next(e);
        }
    }
};

const deleteCategory: RequestHandler = async (req, res, next) => {
    const id = +req.params.id;
    try {
        await prisma.categories.delete({
            where: { id },
        });
        res.status(200).send({ msg: 'Delete Category successfully' });
    } catch (err) {
        if (err instanceof PrismaErr) {
            if (err.code === 'P2003')
                err.message = `This category cannot be delete because it is currently in use.`;
        }
        next(err);
    }
};

const updateCategory: RequestHandler = async (req, res, next) => {
    const id = +req.body.id;
    const name = req.body.name;
    try {
        await prisma.categories.update({
            data: {
                name: name,
            },
            where: { id },
        });
        res.status(200).send({ msg: 'Update category name successfully' });
    } catch (e) {
        if (e instanceof PrismaErr) {
            if (e.code === 'P2002')
                e.message = `Can't update , This category name aready exites.`;
            next(e);
        } else {
            next(e);
        }
    }
};

const categoryCt = {
    getCategory,
    addCategory,
    deleteCategory,
    updateCategory,
};

export default categoryCt;
