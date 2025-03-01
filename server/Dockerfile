FROM node:18.9.1
WORKDIR /app
ENV PORT=2000
COPY package.json .
RUN npm install
COPY . .
EXPOSE $PORT
CMD ["npm", "start"]