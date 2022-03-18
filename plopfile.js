import componentGenerator from "./generators/component/index.js";
import featureGenerator from "./generators/feature/index.js";
import openapiTS from "openapi-typescript";
import * as fs from "fs";
import { existsSync } from "fs";
import Handlebars from "handlebars";

export const OPENAPITSURL =
  "https://sidvhwpbhgmlmhvqdtlf.supabase.co/rest/v1/?apikey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNpZHZod3BiaGdtbG1odnFkdGxmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDY5ODk2MzgsImV4cCI6MTk2MjU2NTYzOH0.SFl-5eU-Y-2Y-jgc4DbEH8TpoHbp-VkVzeoVH5uzJbg";

const renderHandleBarTemplate = ({ path, templateFile, data }) => {
  const test = fs.readFileSync(templateFile).toString();
  const Template = Handlebars.compile(test);
  const result = Template(data);
  fs.writeFileSync(path, result);
};

export default function (plop) {
  plop.setActionType(
    "getSupabaseTypes",
    async function (answers, config, plop) {
      try {
        const output = await openapiTS(OPENAPITSURL);

        const definitions = output
          .replace(/.*(?=export interface definitions)/gms, "")
          .replace(/(?<=export interface parameters).*/gms, "")
          .replace("export interface parameters", "")
          .replace("export interface definitions {", "")
          .split(/(?<=\};).*/g);

        let types = [];

        definitions
          .filter((definition) => definition.length > 10)
          .forEach((definition, index, array) => {
            const key = definition.match(/\w*:/)[0].replace(":", "");
            const value = definition.match(/{.*};/ms)[0];
            const exists = existsSync(`features/${key}`);
            types.push({ key, value, exists });
          });

        types.forEach((type) => {
          console.log(type);
          if (!type.exists) {
            renderHandleBarTemplate({
              type: "add",
              path: "features/{{snakeCase name}}/index.ts",
              templateFile: "generators/feature/index.ts.hbs",
              data: { name: type.key },
            });
            renderHandleBarTemplate({
              type: "add",
              path: "features/{{snakeCase name}}/types/index.ts",
              templateFile: "generators/feature/types/index.ts.hbs",
              data: { name: type.key },
            });
            renderHandleBarTemplate({
              type: "add",
              path: "pages/{{snakeCase name}}/[{{camelCase name}}Id].tsx",
              templateFile: "generators/feature/pages/SinglePage.tsx.hbs",
              data: { name: type.key },
            });
            renderHandleBarTemplate({
              type: "add",
              path: "pages/{{snakeCase name}}/index.tsx",
              templateFile: "generators/feature/pages/List.tsx.hbs",
              data: { name: type.key },
            });
            renderHandleBarTemplate({
              type: "add",
              path: "features/{{snakeCase name}}/components/Create{{properCase name}}.tsx",
              templateFile: "generators/feature/components/Create.tsx.hbs",
              data: { name: type.key },
            });
            renderHandleBarTemplate({
              type: "add",
              path: "features/{{snakeCase name}}/components/Delete{{properCase name}}.tsx",
              templateFile: "generators/feature/components/Delete.tsx.hbs",
              data: { name: type.key },
            });
            renderHandleBarTemplate({
              type: "add",
              path: "features/{{snakeCase name}}/components/{{properCase name}}sList.tsx",
              templateFile: "generators/feature/components/List.tsx.hbs",
              data: { name: type.key },
            });
            renderHandleBarTemplate({
              type: "add",
              path: "features/{{snakeCase name}}/components/Update{{properCase name}}.tsx",
              templateFile: "generators/feature/components/Update.tsx.hbs",
              data: { name: type.key },
            });
            renderHandleBarTemplate({
              type: "add",
              path: "features/{{snakeCase name}}/api/create{{properCase name}}.ts",
              templateFile: "generators/feature/api/create.ts.hbs",
              data: { name: type.key },
            });
            renderHandleBarTemplate({
              type: "add",
              path: "features/{{snakeCase name}}/api/delete{{properCase name}}.ts",
              templateFile: "generators/feature/api/delete.ts.hbs",
              data: { name: type.key },
            });
            renderHandleBarTemplate({
              type: "add",
              path: "features/{{snakeCase name}}/api/get{{properCase name}}.ts",
              templateFile: "generators/feature/api/get.ts.hbs",
              data: { name: type.key },
            });
            renderHandleBarTemplate({
              type: "add",
              path: "features/{{snakeCase name}}/api/get{{properCase name}}s.ts",
              templateFile: "generators/feature/api/getList.ts.hbs",
              data: { name: type.key },
            });
            renderHandleBarTemplate({
              type: "add",
              path: "features/{{snakeCase name}}/api/update{{properCase name}}.ts",
              templateFile: "generators/feature/api/update.ts.hbs",
              data: { name: type.key },
            });
            // Add new feature to MainLayout Nav
            /*{
                                                                type: "append",
                                                                    path: "components/Layout/MainLayout.tsx",
                                                                pattern: /{ name: ".*", to: ".*", icon: .* }/,
                                                                separator: ",\n    ",
                                                                template: `{ name: "{{titleCase name}}", to: "/{{dashCase name}}", icon: FolderIcon }`,
                                                            },*/
          }
        });
      } catch (error) {
        throw Error(error);
      }
    }
  );

  plop.setActionType("add2", () => {
    renderHandleBarTemplate({
      path: "./types/index.html",
      templateFile: "./types/template.ts.hbs",
    });
  });

  plop.setGenerator("test", {
    description: "Das ist ein Test",
    actions: [{ type: "add2", name: "Do The Thing!", message: "Yay!" }],
    prompts: [],
  });
  plop.setGenerator("component", componentGenerator);
  plop.setGenerator("feature", featureGenerator);
  plop.setGenerator("store", featureGenerator);
  plop.setGenerator("migration", featureGenerator);
}
