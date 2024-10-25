FROM node:20-alpine AS build

WORKDIR /app

#Install pnpm globally to speed up installation
RUN npm install -g pnpm

#Copy all the content
COPY . .

RUN pnpm i

#Build solution
RUN pnpm build

# Remove all the dev dependencies
RUN pnpm prune --production 

#Serve stage
FROM node:20-alpine AS main

WORKDIR /app

COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/.env ./.env

ENTRYPOINT [ ]

#Serve 
CMD ["npm", "run", "serve"]