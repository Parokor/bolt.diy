# Use lightweight Node.js image (saves space)
FROM node:14-alpine

# Set working directory INSIDE the container
WORKDIR /app

# Copy ONLY package.json (install deps first, Docker caches this layer)
COPY package*.json ./

# Install ALL dependencies (including devDependencies, we need them)
RUN npm install

# Now copy ALL your code (slow step, but only happens once)
COPY . .

# Expose port 80 (where our app will listen)
EXPOSE 80

# Run Bolt.diy server (CMD is the default command when container starts)
CMD ["node", "server.js"]
