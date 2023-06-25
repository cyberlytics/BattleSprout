FROM node:18.16.0

RUN mkdir /app
COPY . /app
WORKDIR /app

ENV SECRET_KEY="34234DJKFHASBJBS"

RUN npm install

RUN npm run build

EXPOSE 80

CMD [ "npm", "start" ]


