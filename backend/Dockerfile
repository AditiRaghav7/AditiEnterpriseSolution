FROM node
RUN mkdir -p /app
WORKDIR /app
COPY ./package.json /app
RUN npm install
COPY ./app
EXPOSE 8000
EXPOSE 3306
CMD ["npm", "start"]
