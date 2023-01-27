FROM registry1.dso.mil/ironbank/opensource/nodejs/nodejs16:16.17.1 AS builder

USER node

WORKDIR /home/node
COPY --chown=node:node . .
EXPOSE 8080

RUN npm ci
RUN npm run build

FROM registry1.dso.mil/ironbank/opensource/nginx/nginx:1.23.1
USER nginx

COPY --from=builder --chown=nginx:nginx /home/node/build /etc/nginx/html
COPY --from=builder --chown=nginx:nginx /home/node/src /app/src

EXPOSE 8080

CMD [ "nginx", "-g", "daemon off;" ]
