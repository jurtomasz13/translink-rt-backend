# Base image
FROM node:18 AS nestjs-server

# Create app directory
WORKDIR /workdir

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json yarn.lock ./

# Install app dependencies
RUN yarn install

# Bundle app source
COPY . .

# Expose PORT
EXPOSE 8000:8000

# Creates a "dist" folder with the production build
RUN yarn build

# Set the command to run when the container starts
CMD ["yarn", "start:dev"]