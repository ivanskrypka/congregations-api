FROM node:22-alpine as builder
WORKDIR "/app"

COPY ./package*.json ./
RUN npm ci  --legacy-peer-deps

COPY . .
RUN npm run build

FROM node:22-alpine as runner
WORKDIR "/app"
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
RUN npm ci --omit=dev  --legacy-peer-deps

ENV NODE_ENV=production
CMD ["npm", "run", "start:prod"]