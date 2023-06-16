FROM node:16.16.0-alpine AS build

RUN apk add curl

USER node

WORKDIR /back-end

COPY ./app app/
COPY ./database database/
COPY package-lock.json package.json .
RUN npm install

EXPOSE 9428
CMD ["npm", "run", "start"]
# commande terminal docker run -p 8000:9428 build (posteman : /http://localhost:8000/api/status)