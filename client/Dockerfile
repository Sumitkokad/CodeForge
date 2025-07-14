# # client/Dockerfile
# FROM node:18

# WORKDIR /app

# COPY package*.json ./
# RUN npm install

# COPY . ./

# RUN npm run build

# EXPOSE 5173

# CMD ["npm", "run", "dev"]



# new code 


# FROM node:18

# WORKDIR /app

# COPY package.json package-lock.json ./

# RUN npm ci

# COPY . .

# RUN npm run build

# EXPOSE 5173

# CMD ["npm", "run", "dev"]


# new1.1


# client/Dockerfile
FROM node:18

WORKDIR /app

# Ensure clean, reproducible installs
COPY package.json package-lock.json ./
RUN npm ci

COPY . .

RUN npm run build

EXPOSE 5173

CMD ["npm", "run", "dev"]