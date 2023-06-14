FROM node:16.16.0-alpine AS build

USER node
WORKDIR /front-end

COPY ./src src/
COPY angular.json package-lock.json package.json tsconfig.app.json tsconfig.json tsconfig.spec.json tslint.json .
RUN npm install

EXPOSE 4200
CMD ["npm", "start"]
