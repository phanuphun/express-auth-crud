## Installation & Setup
1. Run `npm install` to install dependencies.
2. Create an environment file named `.env` in the project root, and set your configuration values. (If you want to customize the image URL , you can do in `./config/config.ts`)
```shell
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=SCHEMA"
HOST="--YOUR_EXPRESS_HOST--"
PORT="--YOUR_EXPRESS_PORT--"
PRIVATE_KEY="--YOUR_PRIVATE_KEY--"
```
3. Run `npm run dev` to start server on `localhost:4030` or your specified port.
