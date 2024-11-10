import express from 'express';
import path from 'path';
import router from './routes/routes';
import errHandler from './middleware/errHandler';
import {config} from './config/config';

const app = express();
const port = config.port;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './public')));

app.use(router);

app.use(errHandler);

app.listen(port || 3030, () => {
    console.log('server start at port: ', port || 3030);
});
