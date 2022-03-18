const { log } = require("console");

module.exports = {
  description: "Add new Feature",
  prompts: [
    {
      type: "input",
      name: "name",
      message: "feature name",
    },
    {
      type: "list",
      name: "renderingChoice",
      message: "Select how you want your feature to render in NextJS",
      choices: ["client side", "server side", "static"],
    },
    /*    {
                                  type: "editor",
                                  name: "interface",
                                  message: `TypeScript type for feature
                                  Only provide key value pairs for the type like so:
                                  title: string;
                                  count: number;
                                  `,
                                  when: ({ typeChoice }) => typeChoice === "create new type",
                                },
                                {
                                  type: "input",
                                  name: "supabase-url",
                                  message: "Please provide the supabase url of your project",
                                  when: ({ typeChoice }) => typeChoice === "supabase project",
                                },
                                {
                                  type: "input",
                                  name: "supabase-public-anon-key",
                                  message: "Please provide the supabase public anon key of your project",
                                  when: ({ typeChoice }) => typeChoice === "supabase project",
                                },*/
  ],
  actions: [
    {
      type: "add",
      path: "features/{{snakeCase name}}/index.ts",
      templateFile: "generators/feature/index.ts.hbs",
    },
    {
      type: "add",
      path: "features/{{snakeCase name}}/types/index.ts",
      templateFile: "generators/feature/types/index.ts.hbs",
    },
    {
      type: "add",
      path: "pages/{{snakeCase name}}/[{{camelCase name}}Id].tsx",
      templateFile: "generators/feature/pages/SinglePage.tsx.hbs",
    },
    {
      type: "add",
      path: "pages/{{snakeCase name}}/index.tsx",
      templateFile: "generators/feature/pages/List.tsx.hbs",
    },
    {
      type: "add",
      path: "features/{{snakeCase name}}/components/Create{{properCase name}}.tsx",
      templateFile: "generators/feature/components/Create.tsx.hbs",
    },
    {
      type: "add",
      path: "features/{{snakeCase name}}/components/Delete{{properCase name}}.tsx",
      templateFile: "generators/feature/components/Delete.tsx.hbs",
    },
    {
      type: "add",
      path: "features/{{snakeCase name}}/components/{{properCase name}}sList.tsx",
      templateFile: "generators/feature/components/List.tsx.hbs",
    },
    {
      type: "add",
      path: "features/{{snakeCase name}}/components/Update{{properCase name}}.tsx",
      templateFile: "generators/feature/components/Update.tsx.hbs",
    },
    {
      type: "add",
      path: "features/{{snakeCase name}}/api/create{{properCase name}}.ts",
      templateFile: "generators/feature/api/create.ts.hbs",
    },
    {
      type: "add",
      path: "features/{{snakeCase name}}/api/delete{{properCase name}}.ts",
      templateFile: "generators/feature/api/delete.ts.hbs",
    },
    {
      type: "add",
      path: "features/{{snakeCase name}}/api/get{{properCase name}}.ts",
      templateFile: "generators/feature/api/get.ts.hbs",
    },
    {
      type: "add",
      path: "features/{{snakeCase name}}/api/get{{properCase name}}s.ts",
      templateFile: "generators/feature/api/getList.ts.hbs",
    },
    {
      type: "add",
      path: "features/{{snakeCase name}}/api/update{{properCase name}}.ts",
      templateFile: "generators/feature/api/update.ts.hbs",
    },
    // Add new feature to MainLayout Nav
    {
      type: "append",
      path: "components/Layout/MainLayout.tsx",
      pattern: /{ name: ".*", to: ".*", icon: .* }/,
      separator: ",\n    ",
      template: `{ name: "{{titleCase name}}", to: "./{{dashCase name}}", icon: FolderIcon }`,
    },
  ],
};
