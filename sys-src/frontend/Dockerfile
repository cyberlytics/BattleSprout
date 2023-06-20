FROM node:18.16.0 as build-node

RUN mkdir /app
COPY . /app
WORKDIR /app

ARG socket_url
ARG backend_url

ENV SOCKET_SERVER_URL=$socket_url
ENV SERVER_URL=$backend_url

RUN npm install
ENV PATH /node_modules/.bin:$PATH
RUN npm run build


FROM nginx:stable-alpine

COPY --from=build-node /app/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx" , "-g", "daemon off;"]
