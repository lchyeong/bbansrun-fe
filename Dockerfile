# Step 1: Use the specified Node.js version as the base image
FROM node:v20.12.2-alpine AS build

# Step 2: Set the working directory
WORKDIR /app

# Step 3: Copy the package.json and package-lock.json (if exists)
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the entire project to the container
COPY . .

# Step 6: Build the project
RUN npm run build

# Step 7: Use Nginx to serve the built files
FROM nginx:alpine

# Step 8: Copy built files to Nginx's default directory
COPY --from=build /app/dist /usr/share/nginx/html

# Step 9: Expose the port
EXPOSE 80

# Step 10: Start Nginx
CMD ["nginx", "-g", "daemon off;"]
