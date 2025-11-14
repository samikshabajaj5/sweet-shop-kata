FROM node:18-alpine AS builder

WORKDIR /app

# Cache dependencies
COPY package*.json ./

RUN npm install

# Copy source
COPY . .

# If you're running ts-node directly, this will simply do nothing
RUN npm run build || true


FROM node:18-alpine

WORKDIR /app

# Copy only required artifacts from builder
COPY package*.json ./
RUN npm install --omit=dev

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/src ./src

# Env
ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 4000

# Start the server
CMD ["npm", "start"]
