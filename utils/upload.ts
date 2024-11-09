import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination(req, file, next) {
        next(null, path.join(__dirname, '../public/uploads'));
    },
    filename(req, file, next) {
        const filename =
            String(Math.ceil(Math.random() * 10000 + Date.now())) +
            path.extname(file.originalname);
        next(null, filename);
    },
});

const upload = multer({
    storage: storage,
}).single('bookCover');

const uploadChecker = multer().none();

const uploads = {
    upload,
    uploadChecker,
};

export default uploads;
