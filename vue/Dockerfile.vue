FROM node:22 as build-stage

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the Vue app
COPY . .

# Build the Vue.js app for production
RUN npm run build

# Production Stage
FROM nginx:stable-alpine as production-stage

# Copy the built Vue app from the build-stage to NGINX's HTML folder
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Copy the images directory to NGINX's HTML folder
COPY ./img /usr/share/nginx/html/images


# Copy custom nginx.conf to configure NGINX
COPY ./nginx.conf /etc/nginx/nginx.conf

# Expose port 80 for the app
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]