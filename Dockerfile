FROM node:16 AS base
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY ./ /app/
ENV NODE_ENV=production
RUN npx expo export:web
# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.24
COPY --from=base /app/web-build/ /usr/share/nginx/html/v1