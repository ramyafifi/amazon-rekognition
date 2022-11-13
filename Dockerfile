FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install && npm install aws-sdk

# Bundle app source
COPY . .

EXPOSE 8080
CMD [ "node", "server.js" ]
