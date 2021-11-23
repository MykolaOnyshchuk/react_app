FROM node:12.18.3-alpine
WORKDIR /home/Projects/react_app
COPY package*.json ./
ADD package.json /home/Projects/react_app/package.json
#RUN npm install
#RUN npm install react-scripts@1.1.0 -g
COPY . .
EXPOSE 3000 
CMD ["npm ","start"]
