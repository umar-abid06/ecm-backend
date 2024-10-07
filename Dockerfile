# Use Node.js specific version with Debian-based image (buster)
FROM node:20.12.2-buster

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and yarn.lock to the working directory
COPY package.json yarn.lock ./

# Install dependencies and force bcrypt to rebuild from source
RUN yarn install --build-from-source bcrypt

# Copy the rest of the application code to the working directory
COPY . .

# Ensure node_modules is not copied from local environment
# You may choose to add this to your .dockerignore as well
RUN rm -rf node_modules

# Install dependencies again to ensure compatibility
RUN yarn install --build-from-source bcrypt

# Set permissions for the node user and switch to node user
RUN chown -R node:node /usr/src/app
USER node

# Expose the application's port (default to 8000)
EXPOSE 443
EXPOSE 8000

# Start the application using Yarn
CMD ["yarn", "run", "watch"]
