FROM node:boron

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN npm install -g gulp

COPY package.json /usr/src/app
RUN npm install

COPY . /usr/src/app
RUN gulp build