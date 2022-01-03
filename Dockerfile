FROM node:14-alpine as builder
ENV NODE_ENV production
WORKDIR /code
ADD package.json /code
RUN yarn --registry=https://registry.npm.taobao.org
ADD . /code
RUN yarn run build

FROM nginx:latest
COPY --from=builder /code/build /usr/share/nginx/html/
COPY default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
