FROM node:16.13-alpine3.14

RUN apk add --no-cache bash

RUN apk update && apk add wget  

ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

RUN npm install -g @nestjs/cli@8.2.0

RUN mkdir -p /home/node/app

USER node

WORKDIR /home/node/app

##CMD ["tail", "-f", "/dev/null"]