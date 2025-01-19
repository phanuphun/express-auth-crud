import { CorsOptions } from 'cors';

const originAllowList = [''];

export const customCorsOptions: CorsOptions = {
    origin: function (origin: string | undefined, cb: (err: Error | null, allow?: boolean) => void) {
        if (!origin || originAllowList.includes(origin)) {
            cb(null, true);
        } else {
            console.error(`Origin ${origin} is not allowed by CORS`);
            cb(null, false);
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    preflightContinue: true,
    allowedHeaders: [
        'Content-Type',
        'Authorization'
    ],
    // define preflight response status bc default is 204 , some old brownser not support this status 
    optionsSuccessStatus: 204,
};
