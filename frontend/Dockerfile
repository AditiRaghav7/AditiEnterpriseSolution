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
EXPOSE 5000
EXPOSE 3306

# Start the application
CMD ["npm", "start"]
