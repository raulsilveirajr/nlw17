## Initialize a new project
```bash
npm init -y

## Typescript
# Install typescript
npm i typescript -D

# Initialize typescript
npx tsc --init

# Adjust tsconfig.json based on https://github.com/tsconfig/bases?tab=readme-ov-file

# Install node types
npm i @types/node -D

# Install ts-node
npm i tsx -D


## Other Dependencies

# Install Postgres
npm i postgres

# Install zod (data validation)
npm i zod

# Install Fastify framework
npm i fastify

# Install Fastify Type Provider
npm i fastify-type-provider-zod

# Install BioMe formatter
npm i -D --save-exact @biomejs/biome

# Install drizzle-orm
npm i drizzle-orm

# Install drizzle-kit
npm i drizzle-kit -D
# To generate migrations use "npx drizzle-kit generate" command
# To run migrations use "npx drizzle-kit migrate" command
# To run seeds use "npm run seed" command

# Install cuid2 (collision-resistant ids)
npm i @paralleldrive/cuid2

# Install dayjs (date manipulation)
npm i dayjs

# If you need, PG Online https://neon.tech/


# To run the project
npx ts-node src/index.ts
```
