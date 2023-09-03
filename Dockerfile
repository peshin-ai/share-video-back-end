FROM node:18-alpine

WORKDIR /app

COPY package*.json yarn*.lock ./

ENV MONGO_URL=mongodb+srv://tuanung:Peshin123@funnymovie.fqo4uob.mongodb.net/?retryWrites=true&w=majority
ENV JWT_SECRET=123qwe!

RUN yarn install 

COPY . .

EXPOSE 4040

CMD ["yarn", "start"]
