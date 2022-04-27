# Scaffolding NextJS Applications based on the OpenAPI Specification

A scaffolding tool that uses the [OpenAPI Specification](https://swagger.io/specification/)
to create a NextJS Application. The NextJS Project structure is inspired from alan2207s
[bulletproof-react](https://github.com/alan2207/bulletproof-react) architecture.

## Install project and dependencies

    git clone https://github.com/jonasherr/bulletproof-next-generator

    cd bulletproof-next-generator

    npm install

## Specify OpenAPI Specification in .env file

You can use three different ways to provide the scaffolding tool with the mandatory specification file.

<details open>
<summary><b>1. Supabase (current default solution)</b></summary>

### Signup

If you do not have a supabase account already go to [https://app.supabase.io](https://app.supabase.io)
and sign up.

### Create Project

If you do not have an existing supabase project click on "New Project" to create a new project.\
\
<b>Wait till the project was created by supabase. This could take up to five minutes.</b>

### Create Database structure

Use the SQL Editor (https://app.supabase.io/project/YOUR-PROJECT-NAME/sql) of supabase to create new tables in your
database.\

1. Click "New Query" in left upper corner.
2. Paste in the example data from below or your own SQL query.
3. Press run
4. The tables should now be created.

\
You can also use their table editor UI (https://app.supabase.io/project/YOUR-PROJECT-NAME/editor), if you don't feel
confident to write SQL.

<details open>
<summary><b>If you want to play around with some example data in the project you can add these tables in the SQL Editor:</b></summary>

    create type public.roles as enum (
        'ADMIN',
        'USER'
    );

    create table users (
        id bigint generated by default as identity primary key,
        created_at timestamp with time zone default timezone('utc'::text, now()) not null,
        "firstName" varchar,
        "lastName" varchar,
        role roles default('USER') not null,
        bio text,
        email varchar
    );

    insert into users ("firstName", "lastName", role, bio, email) values
        ('Test First Name', 'Test Last Name', 'USER', 'This is my test bio.', 'test@test.com'),
        ('Test First Name 2', 'Test Last Name 2', 'ADMIN', 'This is my test bio.', 'test2@test.com');

    create table discussions (
        id bigint generated by default as identity primary key,
        created_at timestamp with time zone default timezone('utc'::text, now()) not null,
        title varchar not null,
        body text
    );

    insert into discussions (title, body, "teamId") values
        ('Test Title', 'This is the body text...', null),
        ('Test Title 2', 'This is the body text...', null);

    create table comments (
        id bigint generated by default as identity primary key,
        created_at timestamp with time zone default timezone('utc'::text, now()) not null,
        body text not null,
        "discussionId" bigint references public.discussions not null,
    );

    insert into comments (body, "discussionId") values
        ('This is the comment text...', 1),
        ('This is the comment text 2...', 1);

</details>

Add your supabase ANON KEY and URL to the [.env](.env) file. ANON KEY and URL can be found in your supabase dashboard in
<br/> Settings > API (https://app.supabase.io/project/YOUR-PROJECT-NAME/settings/api).

    NEXT_PUBLIC_SUPABASE_URL=https://your-supabase-url.supabase.co
    NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR-ANON-KEY

</details>

<details>
<summary><b>2. OpenAPI API Route from custom backend (click to view documentation)</b></summary>

Save the url of your OpenAPI Route of your custom backend in the [.env](.env) file.

    SWAGGER_SPECIFICATION_URL=https://your-custom-backend.com/open-api

</details>

<details>
<summary><b>3. Local OpenAPI Specification file (click to view documentation)</b></summary>

Save the filepath to your OpenAPI Specification file in the .env file.

    SWAGGER_SPECIFICATION_FILE_PATH=../swaggerSpecification.json

</details>

_Hint: The scaffolding tool currently uses supabase for authentication out of the box. So please adjust your custom
authentication server in [auth.tsx](lib/auth.tsx), if you are not using supabase._

## Optionally remove example data

There are there three features that are used to show you possible implementation based on the bulletproof-react
achitecture. If you don't want this data remove the folders: comments, discussions and users
from [./features](./features), [./pages](./pages) and remove the routes
from [./components/Layout/MainLayout.tsx](./components/Layout/MainLayout.tsx) in line 26.

## Generate new features

To scaffold the features from your OpenAPI Specification run the generate command in your Terminal.

    npm run generate

The command can be rerun when you added new features or adjusted the table structure of already existing features. When
you adjusted the table structure the scaffolding command will only adjust the types of the existing feature, to prevent
overwrite problems with already specified features.

## Start developing

Your scaffolded application is ready. To start developing, start your development server in your Terminal:

    npm run dev

## Deployment

Information about [deployment](https://nextjs.org/docs/deployment) or NextJS in general can be found on
their [documentation site](https://nextjs.org/docs/getting-started).