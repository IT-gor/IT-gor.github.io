# Use the official Node.js image as a base image
FROM node:22.14.0

# Set environment variables early to ensure they're available during build
# ENV NODE_ENV=production
ENV NODE_ENV=development

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json (or yarn.lock) first to leverage Docker cache
# This helps speed up subsequent builds
COPY package*.json ./

# Install dependencies
RUN yarn install

# Copy the rest of the files
COPY . .

# Expose the port on which the Next.js app will run
EXPOSE 3000

# Start the Next.js app (npm run dev)
# CMD ["npm", "run", "dev"]
CMD ["yarn", "dev"]
