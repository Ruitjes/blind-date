FROM node:16-alpine
WORKDIR /usr/src/app
COPY . ./

# building the app
RUN npm install
RUN npm run build
EXPOSE 3000


# Running the app
CMD [ "npm", "start" ]