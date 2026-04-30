# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
# Copy the static export to Nginx
COPY --from=builder /app/out /usr/share/nginx/html
# Copy a custom nginx config if needed, or just use default
EXPOSE 80
# Cloud Run expects the port to be 8080 by default, but we can configure it
ENV PORT 8080
# Simple Nginx config to handle SPA routing if needed
RUN printf 'server {\n\tlisten 8080;\n\tlocation / {\n\t\troot /usr/share/nginx/html;\n\t\tindex index.html;\n\t\ttry_files $uri $uri.html $uri/ /index.html;\n\t}\n}' > /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
