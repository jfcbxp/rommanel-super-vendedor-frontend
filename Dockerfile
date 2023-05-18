FROM node:16 AS base
WORKDIR /base
COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . .
ENV NODE_ENV=production
RUN npx expo export:web

FROM joseluisq/static-web-server:2-alpine
COPY --from=base /base/web-build /public/v1
COPY ./entrypoint.sh /
COPY ./static-web-server.toml /
ENTRYPOINT ["sh", "/entrypoint.sh"]