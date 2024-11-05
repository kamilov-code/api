FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

# Create certificates directory
RUN mkdir -p /app/certificates

# Install typescript global
RUN npm install -G typescript

COPY . .
RUN npm run build

EXPOSE 3000 3443

CMD ["npm", "start"]
