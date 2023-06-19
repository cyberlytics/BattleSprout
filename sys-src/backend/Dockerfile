FROM node:18.16.0

RUN mkdir /app
COPY . /app
WORKDIR /app


RUN npm install

RUN npm run build

EXPOSE 80

CMD [ "npm", "start" ]


