FROM node:16.14.0-stretch

LABEL Name=node-backend Version=1.0.0

EXPOSE 5000

ENV DEBIAN_FRONTEND=noninteractive

RUN mkdir -p /app && chown -R node:node /app

USER node

WORKDIR /app

COPY --chown=node:node package.json package-lock.json* ./

RUN npm install --no-optional && npm cache clean --force

ENV PATH=/app/node_modules/.bin:$PATH

WORKDIR /app/node_app

CMD ["npm", "run", "dev"]