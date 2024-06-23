FROM node:18

RUN mkdir /app

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 7000

CMD ["npm", "run", "start:dev"]
