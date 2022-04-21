# Scaffolding NextJS Applications based on the OpenAPI Specification

A scaffolding tool that uses the [OpenAPI Specification](https://swagger.io/specification/)
to create a NextJS Application. The NextJS Project structure is inspired from alan2207s
[bulletproof-react](https://github.com/alan2207/bulletproof-react) architecture.

## Install project and dependencies

    git clone https://github.com/jonasherr/bulletproof-next-generator

    npm run install

## Specify OpenAPI Specification in .env file

You can use three different ways to provide the scaffolding tool with the mandatory specification file.

<details>
<summary><b>1. Supabase (current default solution)</b></summary>

### Signup

If you do not have a supabase account already go to [https://app.supabase.io](https://app.supabase.io)
and sign up.

### Create Project

If you do not have an existing supabase project click on "New Project" to create a new project.

### Create Database structure

Use the SQL Editor (https://app.supabase.io/project/YOUR-PROJECT-NAME/sql) of supabase to create new tables in your
database. You can also use their table editor UI (https://app.supabase.io/project/YOUR-PROJECT-NAME/editor), if you
don't feel confident to write SQL.

<details>
<summary><b>If you want to play around with some example data in the project you can add these tables in SQL Editor:</b></summary>

EXAMPLE QUERIES

</details>

Add your supabase ANON KEY and URL to the [.env](.env) file. ANON KEY and URL can be found in your supabase dashboard in
<br/> Settings > API (https://app.supabase.io/project/YOUR-PROJECT-NAME/settings/api).

    NEXT_PUBLIC_SUPABASE_URL=https://your-supabase-url.supabase.co
    NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR-ANON-KEY

</details>

<details>
<summary><b>2. OpenAPI API Route from custom backend</b></summary>

Save the url of your OpenAPI Route of your custom backend in the [.env](.env) file.

    SWAGGER_SPECIFICATION_URL=https://your-custom-backend.com/open-api

</details>

<details>
<summary><b>3. Local OpenAPI Specification file</b></summary>

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