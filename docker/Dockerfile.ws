FROM node:22-alpine
# Copy files
COPY ./packages ./packages
COPY ./package.json ./package.json
COPY ./turbo.json ./turbo.json
COPY ./apps/ws-server ./apps/ws-server
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
RUN cd apps/ws-server && pnpm build

EXPOSE 8080
CMD [ "npm ", "run" ,"start:ws" ]