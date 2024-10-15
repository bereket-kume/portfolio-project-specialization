FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build  # This step creates the dist folder

EXPOSE 3000

CMD [ "npm", "run", "start:prod" ]
