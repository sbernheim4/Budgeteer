FROM node:8.9.3
WORKDIR /usr/workdir

COPY . /usr/workdir/
COPY ./entrypoint.sh /usr/entrypoint.sh

RUN npm install
ENTRYPOINT ["/usr/entrypoint.sh"]
