FROM node
RUN mkdir -p /app
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8000
EXPOSE 3306
CMD ["npm", "start"]

