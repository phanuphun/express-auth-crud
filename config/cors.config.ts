import { CorsOptions } from 'cors';

const originAllowList = [
    'http://192.198.1.129:9999'
]

export const customCorsOptions: CorsOptions = {
    origin: function (origin: string | undefined, cb: Function) {
        if (!origin || originAllowList.includes(origin)) {
            cb(null, true)
        } else {
            console.error(`Origin ${origin} is not allowed by CORS`);
            cb(null, false);
        }
    },
    methods: [
        'GET',
        'POST',
        'PUT',
        'DELETE',
        'PATCH'
    ],
    preflightContinue: true,
    allowedHeaders: [
        'Content-Type',
        'Authorization'
    ],
    // define preflight response status bc default is , 204 some brownser not support this status 
    optionsSuccessStatus: 204,
}
