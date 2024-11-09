import Express from 'express';
import { validateToken } from '../middleware/authz';
import { loginRoute } from './auth.routes';
import { categoryRoute } from './category.routes';
import { bookRoute } from './book.routes';

const router = Express.Router();

router.get('/', (req, res) => {
    res.status(200).send(
        'Welcome to express api for testing Auth and CRUD system.',
    );
});

router.use(loginRoute);
router.use(validateToken, categoryRoute);
router.use(validateToken, bookRoute);



export default router;
