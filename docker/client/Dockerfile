# # Stage 2: Create the final image
FROM base-web-authn:latest as BUILD_IMAGE


# Stage 2: Create the final image
FROM macbre/nginx-http3:1.27.1


# # Copy the build output to replace the default nginx contents.
COPY --from=BUILD_IMAGE /usr/src/app/dist/apps/webauthn-angular/browser /usr/share/nginx/html

# # Convert dist to brotli
RUN cd /usr/share/nginx/html && find . -type f -exec brotli {} \;

# CMD ["nginx", "-g", "daemon off;"]