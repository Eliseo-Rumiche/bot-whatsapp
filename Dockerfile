FROM node:19-buster

RUN apt-get update && apt-get install -y chromium && rm -rf /var/lib/apt/lists/*

RUN adduser --disabled-password --gecos "" bot
USER bot

WORKDIR /home/bot/app
COPY . .

USER root
RUN chown -R bot:bot /home/bot/app
USER bot

RUN npm install


CMD ["npm", "start"]
