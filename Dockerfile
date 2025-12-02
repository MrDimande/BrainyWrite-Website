# Dockerfile for BrainyWrite Backend
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application files
COPY server.js ./
COPY database/ ./database/

# Create .env file if it doesn't exist (will be overridden by docker-compose)
RUN touch .env

# Expose port
EXPOSE 5000

# Start server
CMD ["node", "server.js"]
