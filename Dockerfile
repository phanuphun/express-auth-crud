FROM node:20
WORKDIR /usr/src/app
COPY ./package* .
RUN npm install

COPY ./prisma ./prisma
RUN npm run prisma:gen

COPY . .

RUN npm run build
RUN cp .env ./dist/
WORKDIR /usr/src/app/dist

CMD ["npm", "run", "start"]