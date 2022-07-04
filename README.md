# Nextify

This is a music app that is basically a spotify clone.
The project was initially created by coding along a [FrontendMasters](https://frontendmasters.com/courses/fullstack-app-next/) project-based course.

In order to make this more than just a project that was coded along a course, i added features such as song upload, single song play, creating new playlist; I also used typescript way more strictly than the course instructor did.

## Getting Started

You need to have a database installed on your computer. This project uses `PostgreSQL` but i think you can use any
database that is supported by `Prisma`.

After installing your database, you need to create a `.env` file in the root of project with the following content:

```
DATABASE_URL="postgresql://amir-admin:1234@localhost:5432/nextify?schema=public"
```

you may want to change the `DATABASE_URL` with your own url. Read more at [Connection URLs](https://www.prisma.io/docs/reference/database-reference/connection-urls) and
[Accessing environment variables from the schema](https://www.prisma.io/docs/concepts/components/prisma-schema#accessing-environment-variables-from-the-schema).

To install all packages run

```
npm install
```

After installing you need to push the prisma schema to the database

```
npx prisma migrate dev
```

In the end run the dev server with

```
npm run dev
```

## Technology Stack

<a style="margin-right: 1rem" href="https://reactjs.org/" title="React"><img src="markdown/reactjs.svg" width="48" height="48" /></a>
<a style="margin-right: 1rem" href="https://www.typescriptlang.org/" title="Typescript"><img src="markdown/typescript.svg" width="48" height="48"/></a>
<a style="margin-right: 1rem" href="https://nextjs.org" title="Next.js"><img src="markdown/nextjs.svg" height="48" width="90"/></a>
<a style="margin-right: 1rem" href="https://www.postgresql.org/" title="Postgres"><img src="markdown/postgres.svg" width="48" height="54"/></a>
<a style="margin-right: 1rem" href="https://www.prisma.io/" title="prisma"><img src="markdown/prisma.svg" width="144" height="48"/></a>
