FROM node:16 AS base
WORKDIR /app
COPY ./src /app/src
COPY ./web /app/web
COPY *.json /app/
COPY *.js /app/
COPY *.tsx /app/
RUN npm install
ENV NODE_ENV=production
RUN npx expo export:web
FROM nginx:1.24
ARG nginx_uid=33
ARG nginx_gid=33
RUN usermod -u $nginx_uid -o nginx && groupmod -g $nginx_gid -o nginx
COPY --from=base /app/web-build/ /usr/share/nginx/html/rommanel-super-vendedor-frontend