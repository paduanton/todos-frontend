FROM node:12

RUN mkdir /app 
 
WORKDIR /app

RUN npm install -g @angular/cli 

COPY . . 
