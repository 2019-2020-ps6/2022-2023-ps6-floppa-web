FROM node:16.16.0-alpine AS build

USER node
WORKDIR /front-end

COPY ./src src/
COPY angular.json package-lock.json package.json tsconfig.app.json tsconfig.json tsconfig.spec.json tslint.json .
RUN npm install

FROM nginx:1.21.1-alpine
COPY --from=node . /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
CMD ["npm", "start"]
