FROM node:16.20.1 as notification_app_frontend

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
RUN mkdir node_modules/.cache && chmod -R 777 node_modules/.cache
RUN mkdir node_modules/.vite && chmod -R 777 node_modules/.vite
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev"]