FROM node:16 AS base
WORKDIR /app
COPY ./src /app/src
COPY ./web /app/web
COPY *.json /app/
COPY *.js /app/
COPY *.tsx /app/
RUN npm install --ignore-scripts
ENV NODE_ENV=production
RUN npx expo export:web
FROM nginx:alpine
RUN  touch /var/run/nginx.pid && \
     chown -R nginx:nginx /var/cache/nginx /var/run/nginx.pid
USER nginx
COPY --from=base /app/web-build/ /usr/share/nginx/html/rommanel-super-vendedor-frontend