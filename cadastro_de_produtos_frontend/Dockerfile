FROM node:22.15.0-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci --legacy-peer-deps

COPY . .

EXPOSE 3002

CMD ["npm", "run", "dev", "--", "--host", "--port", "3002"]