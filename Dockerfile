FROM node:20
WORKDIR /usr/src/app
COPY ./package* .
RUN npm install

COPY ./prisma ./prisma
RUN npm run prisma:gen 

COPY . .
RUN npm run build

WORKDIR /usr/src/app/dist
CMD ["sh", "-c", "npm run prisma:mg:pd && npm run start"]