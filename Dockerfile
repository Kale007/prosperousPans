FROM node:8.1.0

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY . /usr/src/app/

RUN npm update           && \
    npm install -g grunt

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "docker"]
