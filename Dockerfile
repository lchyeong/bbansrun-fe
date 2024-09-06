# Step 1: Use Node.js base image
FROM node:20-alpine AS build

# Step 2: Set the working directory
WORKDIR /app

# Step 3: Copy the package.json and package-lock.json (if exists)
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install && apk add --no-cache curl

# Step 5: Copy the entire project to the container
COPY . .

# Step 6: Build the project
RUN npm run build

# Step 7: Run the application using Node.js
CMD ["npm", "run", "dev"]
