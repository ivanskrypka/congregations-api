FROM node:22-alpine as builder
WORKDIR "/app"

COPY ./package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:22-alpine as runner
WORKDIR "/app"
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
RUN npm ci --omit=dev

ENV NODE_ENV=production
CMD ["npm", "run", "start:prod"]