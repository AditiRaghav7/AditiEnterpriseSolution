# Use Node.js as the base image
FROM node

# Create and set the working directory
RUN mkdir -p /app
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose necessary ports
ENV MYSQL_HOST="my-mysql-container"
ENV MYSQL_USER="root"
ENV MYSQL_PASSWORD="Aditi@1122"
ENV MYSQL_DATABASE="employees_db"
ENV MYSQL_PORT="3306"
EXPOSE 8000
# Start the application
CMD ["npm", "start"]
