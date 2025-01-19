import { Categories, PrismaClient } from '@prisma/client';
import { RequestHandler as ReqHandler } from 'express';
import { PrismaClientKnownRequestError as PrismaErr } from '@prisma/client/runtime/library';

const prisma = new PrismaClient();

// Get Categories
const getCategory: ReqHandler = async (req, res, next) => {
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

// Insert Category
const addCategory: ReqHandler<unknown, unknown, { name: string }> = async (req, res, next) => {
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

// Delete
const deleteCategory: ReqHandler<{ id: number }> = async (req, res, next) => {
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

// Update
interface UpdatecategoryBody {
    id: number,
    name: string
}
const updateCategory: ReqHandler<unknown, unknown, UpdatecategoryBody> = async (req, res, next) => {
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
