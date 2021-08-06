FROM node:15-alpine

ARG AWS_ACCESS_KEY
ARG AWS_SECRET_KEY

RUN apk update

RUN apk add nodejs

RUN npm install -g serverless

# AWSの認証情報を~/.aws/credentialsに書き込む
# Serverless Frameworkは~/.aws/credentialsの認証情報を利用する
RUN serverless config credentials --provider aws --key $AWS_ACCESS_KEY --secret $AWS_SECRET_KEY

WORKDIR /app
