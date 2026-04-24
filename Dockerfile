FROM docker.io/oven/bun:1.2.23 AS builder
WORKDIR /app

ARG PUBLIC_BENTEXT_API_URL
ARG PUBLIC_SITE_URL
ENV PUBLIC_BENTEXT_API_URL=${PUBLIC_BENTEXT_API_URL}
ENV PUBLIC_SITE_URL=${PUBLIC_SITE_URL}

COPY . .
RUN bun install --frozen-lockfile
RUN bun run build

FROM docker.io/oven/bun:1.2.23 AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/public ./public
COPY --from=builder /app/server.ts ./server.ts

EXPOSE 3000
CMD ["bun", "server.ts"]
