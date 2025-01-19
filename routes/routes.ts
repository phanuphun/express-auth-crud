import Express from 'express';
import { validateToken } from '../middleware/authz';
import { loginRoute } from './auth.routes';
import { categoryRoute } from './category.routes';
import { bookRoute } from './book.routes';

const router = Express.Router();

router.get('/', (req, res) => {
    res.status(200).send(
        'Hello API.',
    );
});

router.use(loginRoute);

router.use(validateToken);
router.use(bookRoute);
router.use(categoryRoute);

export default router;
