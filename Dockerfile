FROM node:18-alpine AS build

WORKDIR /app

COPY index.html .
COPY index.ts .
COPY style.css .
COPY font-family/ ./font-family/

RUN npm install -g typescript

RUN tsc index.ts

FROM nginx:stable-alpine

COPY --from=build /app/index.html /usr/share/nginx/html/
COPY --from=build /app/index.js /usr/share/nginx/html/
COPY --from=build /app/style.css /usr/share/nginx/html/
COPY --from=build /app/font-family/ /usr/share/nginx/html/font-family/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

# docker build -t registry.gitlab.com/baptiste.bronsin/prix_operateur:1.0.0 .
# docker push registry.gitlab.com/baptiste.bronsin/prix_operateur:1.0.0
# docker run -p 8080:80 registry.gitlab.com/baptiste.bronsin/prix_operateur:1.0.0