# PRODUCTION DOCKERFILE
# ---------------------
# This Dockerfile allows to build a Docker image of the NestJS application
# and based on a NodeJS 16 image. The multi-stage mechanism allows to build
# the application in a "builder" stage and then create a lightweight production
# image containing the required dependencies and the JS build files.
# 
# Dockerfile best practices
# https://docs.docker.com/develop/develop-images/dockerfile_best-practices/
# Dockerized NodeJS best practices
# https://github.com/nodejs/docker-node/blob/master/docs/BestPractices.md
# https://www.bretfisher.com/node-docker-good-defaults/
# http://goldbergyoni.com/checklist-best-practice-of-node-js-in-production/

FROM node:16-alpine As development

WORKDIR /usr/src/app
EXPOSE 5555
COPY package*.json ./

RUN npm install --only=development

COPY . .

ENV NODE_OPTIONS=--max_old_space_size=2048
RUN npm run build

FROM node:16-alpine as production

# ARG NODE_ENV=production
# ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN apk update
RUN apk add --upgrade graphicsmagick
RUN apk add --no-cache imagemagick ffmpeg

RUN npm install --production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]