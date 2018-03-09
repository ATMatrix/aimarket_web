FROM node:8

LABEL maintainer "tyzhou"

RUN mkdir -p /aimarket_web
WORKDIR /aimarket_web


COPY src /aimarket_web/src
COPY .roadhogrc /aimarket_web/.roadhogrc
COPY package.json /aimarket_web/package.json

RUN npm i && npm run build:dll

EXPOSE 8000

CMD ["npm", "start"]
