import express from 'express';
import path from 'path';
import router from './routes/routes';
import errHandler from './middleware/errHandler';
import { config } from './config/config';
import cors from 'cors';
import { customCorsOptions } from './config/cors.config';
import helmet from 'helmet';


const app = express();

const host = config.host;
const port = config.port || 3030;

app.use(helmet());
app.use(cors(customCorsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './public')));

app.use(router);

app.use(errHandler);

app.listen(+port , host , () => {
    console.log(`server start at http://${host}:${port || 3030}`);
});
