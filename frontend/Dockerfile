FROM node:14.0.0
WORKDIR /frontend
COPY package.json /frontend
RUN npm install
RUN npm install react-scripts@4.0.0 -g --silent
COPY . /frontend
CMD ["npm", "start"]