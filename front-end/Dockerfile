#https://gist.github.com/msreekm/a141725bb8e98649b3718a1ed6a94d0e
FROM node:16-alpine as base
WORKDIR /opt
COPY package*.json ./
RUN npm ci --production && npm cache clean --force

# for dev mode
FROM base as dev
WORKDIR /opt
ENV PATH=/opt/node_modules/.bin:$PATH
RUN npm install --only=development
WORKDIR /opt/app
# I Don't Copy source code because on dev mode, I'll use mount

# for prodcution without dev dependencies
FROM base as prod
ENV PATH=/opt/node_modules/.bin:$PATH
WORKDIR /opt/app
COPY . .
RUN npm run build 
EXPOSE 3000
CMD npm run start
HEALTHCHECK CMD curl --fail http://localhost:3000