FROM node:16.16.0-alpine AS build-stage

RUN apk add sed
ARG PORT

WORKDIR /usr/local/app

COPY .editorconfig angular.json default.conf package*.json tsconfig*.json ./
COPY ./src src/

RUN sed -i "s/<PORT>/${PORT: -8000}/g" /usr/local/app/src/environments/environment.prod.ts
RUN npm install
RUN npm run build

# Prod
FROM nginxinc/nginx-unprivileged:latest

USER nginx

COPY --from=build-stage /usr/local/app/dist/starter-quiz-two /usr/share/nginx/html/
COPY --from=build-stage /usr/local/app/default.conf /etc/nginx/conf.d/

EXPOSE 4200

CMD ["nginx", "-g", "daemon off;"]