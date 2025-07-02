# 1. Base image
FROM node:18-alpine

# 2. Set working directory
WORKDIR /app

# 3. Copy package files and install only prod deps
COPY package.json package-lock.json ./
RUN npm ci

# 4. Copy all source files
COPY . .

# 5. Build Next.js
RUN npm run build

# 6. Set environment and expose port
ENV PORT=3002
EXPOSE 3002

# 7. Start Next.js
CMD ["npm", "start"]