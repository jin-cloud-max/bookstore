#!/bin/bash

dockerize -wait tcp://db:3306 -timeout 20s

npm install
npm run start:dev

npx prisma migrate dev

