# Build stage - lightweight Node.js image
FROM node:18-alpine

# Set working directory in container
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies (only production deps, no devDependencies)
RUN npm ci --only=production

# Copy the rest of the application code
COPY . .

# Expose the port the backend runs on
EXPOSE 5000

# Health check to verify container is running
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:5000', (r) => {if (r.statusCode !== 404) throw new Error(r.statusCode)})"

# Start the application
CMD ["npm", "start"]
