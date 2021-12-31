FROM node:14-alpine3.12
ENV NODE_ENV development
# Add a work directory
RUN mkdir /app
WORKDIR /app
# Cache and Install dependencies
COPY package.json /app
COPY yarn.lock /app
RUN yarn install
# Copy app files
COPY . /app
# Expose port
EXPOSE 3000
