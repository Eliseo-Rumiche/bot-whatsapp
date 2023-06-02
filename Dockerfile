FROM node:19-buster

RUN apt-get update && apt-get install -y chromium && rm -rf /var/lib/apt/lists/*

RUN adduser --disabled-password --gecos "" bot
USER bot

WORKDIR /home/bot/app

COPY package.json .


RUN npm install

COPY . .


CMD ["npm", "start"]