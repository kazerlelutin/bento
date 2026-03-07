FROM docker.io/oven/bun:latest AS builder
WORKDIR /app

# Build-time args (to pass in --build-arg or via "Build Arguments" CapRover)
ARG PUBLIC_BENTEXT_API_URL
ENV PUBLIC_BENTEXT_API_URL=${PUBLIC_BENTEXT_API_URL}

COPY . .
RUN bun install --frozen-lockfile
RUN bun run build

FROM socialengine/nginx-spa:latest

COPY --from=builder /app/dist /app/
COPY --from=builder /app/public /app/public