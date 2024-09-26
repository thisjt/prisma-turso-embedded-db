# Embedded Replicas in Turso using Prisma

A minimum reproducible code to make Embedded DB work with Turso and Prisma.

## How to run?

1. Run `pnpm install`
2. Follow this [tutorial](https://turso.tech/blog/introducing-embedded-replicas-deploy-turso-anywhere-2085aa0dc242) in creating a database using turso
3. Run `pnpm dev`
4. Open your Turso database online
5. Open the `dev.db` file using a SQLite DB viewer
6. Open the http server endpoints:
   - http://localhost:3010/save?value=x (replace x with random test data or string)
     - keep in mind that running this also autoruns the sync command after based on observation as when the Turso database online viewer is refreshed, data is already present there
   - http://localhost:3010/load (load data from local database)
   - http://localhost:3010/sync
     - add test data in Turso database online first
     - then refresh sqlite db viewer application, there is missing data
     - load sync url above
     - then refresh sqlite db viewer application again, missing data is filled up

## What lines of code are important?

You only need to check how it is implemented in `src/index.js`. You can check how both local and online db is mounted by checkin `src/prisma.js`.
