
FROM mongo:latest


COPY mongodb-config.js /docker-entrypoint-initdb.d/
WORKDIR /data/db
EXPOSE 27017
