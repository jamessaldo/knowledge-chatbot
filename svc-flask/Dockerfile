FROM python:3.7.8-alpine3.12

RUN mkdir /app
WORKDIR /app
COPY requirements.txt /app

RUN apk update && \
    apk --no-cache add gcc linux-headers musl-dev python3 python3-dev \
    && pip3 install --upgrade pip \
    && pip3 install gunicorn \
    && pip3 install -r requirements.txt \
    && apk del build-base

COPY . /app
EXPOSE 5000