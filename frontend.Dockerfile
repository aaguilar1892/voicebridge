# Dockerfile for the React Frontend (voicebridge-app/client)
# Uses a multi-stage build for a smaller final image

# --- Stage 1: Build the React App ---
# Use Node.js version 19 Alpine as the base image for building
FROM node:19-alpine as build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY ./voicebridge-app/client/package.json ./voicebridge-app/client/package-lock.json* ./

# Install dependencies
RUN npm install

# Copy the rest of the client application code
COPY ./voicebridge-app/client ./

# Build the application for production
# Ensure the build script is correctly defined in package.json
RUN npm run build

# --- Stage 2: Serve the built app with Nginx ---
# Use a lightweight Nginx image
FROM nginx:stable-alpine

# Copy the build output from the 'build' stage to Nginx's web root directory
COPY --from=build /app/dist /usr/share/nginx/html

# Copy the custom Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 for the Nginx web server
EXPOSE 80