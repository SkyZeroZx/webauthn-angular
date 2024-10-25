# From shared base image
FROM base-web-authn:latest as BUILD_IMAGE

# remove unused dependencies
RUN rm -rf node_modules/@cypress
RUN rm -rf node_modules/@eslint
RUN rm -rf node_modules/@eslint-community
RUN rm -rf node_modules/@jest

RUN rm -rf node_modules/@nrwl
RUN rm -rf node_modules/@nx
RUN rm -rf node_modules/typescript
RUN rm -rf node_modules/@swc
RUN rm -rf node_modules/@pkgjs
RUN rm -rf node_modules/@vitejs
RUN rm -rf node_modules/@esbuild
RUN rm -rf node_modules/@types
RUN rm -rf node_modules/@typescript-eslint
RUN rm -rf node_modules/prebuild-install

# FrontEnd unsed dependencies 
RUN rm -rf node_modules/@angular-eslint
RUN rm -rf node_modules/@tailwindcss
RUN rm -rf node_modules/@nuxtjs
RUN rm -rf node_modules/@material
RUN rm -rf node_modules/@schematics
RUN rm -rf node_modules/@angular
RUN rm -rf node_modules/@angular-devkit
RUN rm -rf node_modules/@ngtools
RUN rm -rf node_modules/zone.js
RUN rm -rf node_modules/xhr2


RUN rm -rf node_modules/ngx-facebook-messenger
RUN rm -rf node_modules/ngx-infinite-scroll
RUN rm -rf node_modules/ngx-skeleton-loader
RUN rm -rf node_modules/@npmcli
RUN rm -rf node_modules/@webassemblyjs
RUN rm -rf node_modules/postcss
RUN rm -rf node_modules/@jsdom


# Delete cache of node_module is specially heavy size
RUN rm -rf node_modules/.cache/nx
RUN rm -rf node_modules/.cache/webpack-dev-server

# Stage 2: Create the final image
FROM node:20-alpine3.20 

# Set Env Global of Node to production
ENV NODE_ENV production

WORKDIR /usr/src/app

# Copy the built application and dependencies from the previous stage
COPY --from=BUILD_IMAGE /usr/src/app/dist ./dist
COPY --from=BUILD_IMAGE /usr/src/app/node_modules ./node_modules


# Command to start the application
CMD [ "node", "dist/apps/webauthn-nestjs/main" ]