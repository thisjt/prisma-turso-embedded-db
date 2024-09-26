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
     - keep in mind that running this also autoruns the sync command after based on observation
       as when the Turso database online viewer is refreshed, data is already present there
   - http://localhost:3010/load (load data from local database)
   - http://localhost:3010/sync
     - add test data in Turso database online first
     - then refresh sqlite db viewer application, there is missing data
     - load sync url above
     - then refresh sqlite db viewer application again, missing data is filled up

## What lines of code are important?

Honestly it's just a drop-in replacement of SQLite (except you lose the auto-migrate schema functionality).The only important line in `src/index.js` is
[`await libsql.sync()`](https://github.com/thisjt/prisma-turso-embedded-db/blob/f562697e63561e0e13d1a84757f154ad4fb492ef/src/index.js#L39). You can
check how both local database and sync database is mounted by checking `src/prisma.js`.

You can have `dev.db` completely empty or missing. When you run `libsql.sync()`, `dev.db` gets completely reconstructed. That way, when you want to do
a schema change, you only need to do it on Turso's side, then delete `dev.db` and then re-run `libsql.sync()`.
