# Stage 1: Build the application
FROM node:20-alpine3.20 AS BUILD_IMAGE

# Install dependencies and tools
RUN apk --no-cache add curl bash

# Install node-prune
RUN curl -sf https://gobinaries.com/tj/node-prune | sh


# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy all project source with package.json , package-lock.json
COPY . .

# Install application dependencies
RUN npm i 

RUN npm run build


# Remove development dependencies
RUN npm prune --production

# Run node-prune
RUN /usr/local/bin/node-prune




