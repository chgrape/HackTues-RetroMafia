FROM node:19-alpine as builder
WORKDIR /app
COPY package.json .
COPY package-lock.json .
COPY src/* .
COPY public/* .
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.19.0
WORKDIR /usr/share/nginx/html
RUN rm -rf *
COPY --from=builder /app/build .
ENTRYPOINT ["nginx", "-g", "daemon off;"]
