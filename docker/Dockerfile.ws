FROM node:22-alpine
WORKDIR /usr/src/app
COPY ./packages ./packages
COPY ./package.json ./package.json
COPY ./turbo.json ./turbo.json
COPY ./apps/ws-server ./apps/ws-server
RUN npm  install
RUN npm run db:generate
RUN npm run build:ws
EXPOSE 8080
CMD [ "npm ", "run" ,"start:ws" ]