FROM node:22-alpine
WORKDIR /usr/src/app
COPY ./packages ./packages
COPY ./package.json ./package.json
COPY ./turbo.json ./turbo.json
COPY ./apps/http-server ./apps/http-server
COPY ./packages/db/package.json ./packages/db/package.json
# RUN npm install prisma -D
RUN npm install prisma
RUN npm  install
RUN npm run db:generate
RUN npm run build:backend
EXPOSE 3001
CMD [ "npm ", "run" ,"start:backend" ]