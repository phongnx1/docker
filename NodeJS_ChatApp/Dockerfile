FROM node:4.4.5

RUN mkdir -p /usr/src/app

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY ./NodeJS_ChatApp/package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY ./NodeJS_ChatApp /usr/src/app

CMD [ "node" ]

RUN chmod +x startup.sh
RUN npm install -g nodemon
