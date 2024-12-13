FROM node:22

# install simple http server for serving static content
RUN npm install -g http-server

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the Vue app
COPY . .

# Build the Vue.js app for production
RUN npm run build


EXPOSE 8080
CMD [ "http-server", "dist" ]
