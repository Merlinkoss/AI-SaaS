FROM node:lts-buster-slim AS base
RUN apt-get update && apt-get install libssl-dev ca-certificates -y
WORKDIR /app

COPY package.json package-lock.json ./

FROM base as build
ENV NODE_ENV=production
RUN npm install
COPY . .
RUN npx prisma generate
RUN npm run build

FROM base as prod-build
RUN npm install --production
COPY prisma prisma
RUN npm run postinstall
RUN cp -R node_modules prod_node_modules

FROM base as prod
# Clerk https://clerk.com/docs/nextjs/get-started-with-nextjs#update-your-environment-variables
ENV NEXT_PUBLIC_CLERK_SIGN_IN_URL='/sign-in'
ENV NEXT_PUBLIC_CLERK_SIGN_UP_URL='/sign-up'
ENV NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL='/dashboard'
ENV NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL='/dashboard'
# 
COPY --from=prod-build /app/prod_node_modules /app/node_modules
COPY --from=build  /app/next.config.js ./
COPY --from=build  /app/.next /app/.next
COPY --from=build  /app/public /app/public
COPY --from=build  /app/prisma /app/prisma

EXPOSE 3000
CMD ["npm", "run", "start"]