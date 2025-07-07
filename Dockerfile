FROM docker.io/oven/bun:latest AS builder
WORKDIR /app
COPY . .
RUN bun install --frozen-lockfile
RUN bun run build

FROM socialengine/nginx-spa:latest

COPY --from=builder /app/dist /app/
COPY --from=builder /app/public /app/public