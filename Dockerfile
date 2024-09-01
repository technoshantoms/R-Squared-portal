FROM node:16.17 AS build

RUN yarn global add cross-env

CMD mkdir /rsquared-portal
WORKDIR /rsquared-portal

ADD package.json ./
ADD yarn.lock ./
ADD charting_library ./charting_library
RUN cross-env yarn install

ADD . .

ARG ENV

RUN if [ "${ENV}" = "prod" ]; then \
        echo "Building for production"; \
        NODE_OPTIONS="--max-old-space-size=4096" yarn build; \
    elif [ "${ENV}" = "develop" ]; then \
        echo "Building for develop"; \
        NODE_OPTIONS="--max-old-space-size=4096" yarn build-develop; \
    fi

FROM nginx:1.19 as run

COPY --from=build /rsquared-portal/build/dist /usr/share/nginx/html
COPY conf/nginx.conf /etc/nginx/nginx.conf
