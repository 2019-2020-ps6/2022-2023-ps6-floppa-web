FROM node:16.16.0-alpine AS build-stage

WORKDIR /usr/local/app

COPY .editorconfig angular.json default.conf package*.json tsconfig*.json ./
COPY ./src src/

RUN npm install
RUN npm run build

# Prod
FROM nginxinc/nginx-unprivileged:latest

USER nginx

COPY --from=build-stage /usr/local/app/dist/front-end /usr/share/nginx/html/
COPY --from=build-stage /usr/local/app/default.conf /etc/nginx/conf.d/

EXPOSE 4200

CMD ["nginx", "-g", "daemon off;"]