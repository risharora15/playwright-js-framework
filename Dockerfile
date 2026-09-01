FROM mcr.microsoft.com/playwright:v1.40.0-focal
WORKDIR /app
ENV HOME=/root
COPY package*.json ./
RUN npm ci
COPY . .
ENV CI=true
CMD ["npx", "playwright", "test"]
