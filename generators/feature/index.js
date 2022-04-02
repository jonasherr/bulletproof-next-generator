import { existsSync, readFileSync } from "fs";

import * as changeCase from "change-case";
import { getDefinitions, returnTypes } from "./utils.js";

const generateFeature = {
  description: "Add new Feature",
  prompts: [
    /*{
                                          type: "list",
                                          name: "renderingChoice",
                                          message: "Select how you want your feature to render in NextJS",
                                          choices: ["client side", "server side", "static"],
                                        },*/
  ],
  actions: (data) => {
    let actions = [];

    const output = readFileSync("./types/supabase.ts").toString();

    // TODO: switch from ploppjs to own nodejs api to implement async calls
    /*const output = await openapiTS(OPENAPITSURL);*/

    const definitions = getDefinitions(output);

    definitions
      .filter((definition) => definition.length > 10)
      .forEach((definition) => {
        if (!definition) return;

        const keyMatch = definition.match(/\w*:/);
        if (!keyMatch) return;
        const key = keyMatch[0].replace(":", "");

        const valueMatch = definition.match(/{.*};/ms);
        if (!valueMatch) return;
        const value = valueMatch[0];

        const exists = existsSync(`features/${key}`);

        if (exists === false && key !== undefined && typeof key === "string") {
          const typesArray = returnTypes({ value });

          console.log(typesArray);

          // needs to be set, so plop can read the value in handlebar files
          // TODO: fix behaviour for multiple keys that need to be added
          data.name = key;
          data.value = value;
          data.types = typesArray;
          actions = [
            ...actions,
            {
              type: "add",
              path: `features/${changeCase.snakeCase(key)}/index.ts`,
              templateFile: "generators/feature/index.ts.hbs",
            },
            // TODO: create forms from types
            {
              type: "add",
              path: `features/${changeCase.snakeCase(key)}/types/index.ts`,
              templateFile: "generators/feature/types/index.ts.hbs",
            },
            {
              type: "add",
              path: `pages/${changeCase.snakeCase(key)}/[${changeCase.camelCase(
                key
              )}Id].tsx`,
              templateFile: "generators/feature/pages/SinglePage.tsx.hbs",
            },
            {
              type: "add",
              path: `pages/${changeCase.snakeCase(key)}/index.tsx`,
              templateFile: "generators/feature/pages/List.tsx.hbs",
            },
            {
              type: "add",
              path: `features/${changeCase.snakeCase(
                key
              )}/components/Create${changeCase.pascalCase(key)}.tsx`,
              templateFile: "generators/feature/components/Create.tsx.hbs",
            },
            {
              type: "add",
              path: `features/${changeCase.snakeCase(
                key
              )}/components/Delete${changeCase.pascalCase(key)}.tsx`,
              templateFile: "generators/feature/components/Delete.tsx.hbs",
            },
            {
              type: "add",
              path: `features/${changeCase.snakeCase(
                key
              )}/components/${changeCase.pascalCase(key)}sList.tsx`,
              templateFile: "generators/feature/components/List.tsx.hbs",
            },
            {
              type: "add",
              path: `features/${changeCase.snakeCase(
                key
              )}/components/Update${changeCase.pascalCase(key)}.tsx`,
              templateFile: "generators/feature/components/Update.tsx.hbs",
            },
            {
              type: "add",
              path: `features/${changeCase.snakeCase(
                key
              )}/api/create${changeCase.pascalCase(key)}.ts`,
              templateFile: "generators/feature/api/create.ts.hbs",
            },
            {
              type: "add",
              path: `features/${changeCase.snakeCase(
                key
              )}/api/delete${changeCase.pascalCase(key)}.ts`,
              templateFile: "generators/feature/api/delete.ts.hbs",
            },
            {
              type: "add",
              path: `features/${changeCase.snakeCase(
                key
              )}/api/get${changeCase.pascalCase(key)}.ts`,
              templateFile: "generators/feature/api/get.ts.hbs",
            },
            {
              type: "add",
              path: `features/${changeCase.snakeCase(
                key
              )}/api/get${changeCase.pascalCase(key)}s.ts`,
              templateFile: "generators/feature/api/getList.ts.hbs",
            },
            {
              type: "add",
              path: `features/${changeCase.snakeCase(
                key
              )}/api/update${changeCase.pascalCase(key)}.ts`,
              templateFile: "generators/feature/api/update.ts.hbs",
            },
            // Add new feature to MainLayout Nav
            {
              type: "append",
              path: `components/Layout/MainLayout.tsx`,
              pattern: /{ name: ".*", to: ".*", icon: .* }/,
              separator: ",\n    ",
              template: `{ name: "${key}", to: "/${changeCase.snakeCase(
                key
              )}", icon: FolderIcon }`,
            },
          ];
        }
      });
    /*return [];*/
    return actions;
  },
};

export default generateFeature;
