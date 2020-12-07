FROM node:15.2.1
WORKDIR /backend
COPY package.json /backend
COPY ../package.json /backend
RUN npm install
COPY . /backend
CMD ["npm", "start"]