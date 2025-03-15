FROM node:22-alpine
WORKDIR /usr/src/app

# Copy files
COPY ./packages ./packages
COPY ./package.json ./package.json
COPY ./turbo.json ./turbo.json
COPY ./apps/http-server ./apps/http-server
COPY ./pnpm-lock.yaml ./pnpm-lock.yaml
COPY ./pnpm-workspace.yaml ./pnpm-workspace.yaml

# Install pnpm
RUN npm install -g pnpm

# Install dependencies with pnpm
RUN pnpm install

# Generate Prisma client
RUN pnpm db:generate

# Build the DB package first
RUN cd packages/db && pnpm build

# Now build the backend
RUN cd apps/http-server && pnpm build

EXPOSE 3001
CMD ["pnpm", "--filter", "http-server", "start"]