import {existsSync, mkdirSync, readFileSync, writeFileSync} from "fs";
import handlebars from "handlebars";
import * as changeCase from "change-case";

export const returnTypes = ({ value }) => {
  const valueArray = value.match(/(?=\/\*\*).+?(?=;)/gs);

  return valueArray
    .map((value) => {
      let arrayObject = {};

      const type = value.replaceAll('"', '').match(/(?<=\s{4})\w* ?\w*\??"?: \w*/gi)[0].trim();

      arrayObject.name = type.replace("Format:", "").replace("Note:", "").match(/(\w)* ?(\w)+(?=(["?:]))/i)[0].trim();
      arrayObject.type = type.match(/(?<=:\s)\S*/i)[0];
      if (value.includes("Format: date")) arrayObject.type = "Date"
      arrayObject.optional = type.includes("?");
      arrayObject.primaryKey = value.includes("<pk />");
      if (value.includes("<fk")) {
        arrayObject.foreignKey = {
          table: value.match(/(?<=table=')\w*/i)[0],
          column: value.match(/(?<=column=')\w*/i)[0],
        };
      } else {
        arrayObject.foreignKey = false;
      }

      return arrayObject;
    })
    .filter((object) => object.name !== "id" && object.name !== "created_at");
};

export const getDefinitions = (output) => {
  return output
    .replace(/.*(?=export interface definitions)/gms, "")
    .replace(/(?<=export interface parameters).*/gms, "")
    .replace("export interface parameters", "")
    .replace("export interface definitions {", "")
    .split(/(?<=};).*/g);
};

export const returnArrayWithFeaturesThatDontExist = (definitions) =>
  definitions
    .filter((definition) => definition.length > 10)
    .map((definition) => {
      if (!definition) return;

      const keyMatch = definition.match(/\w*:/);
      if (!keyMatch) return;
      const key = keyMatch[0].replace(":", "");

      const valueMatch = definition.match(/{.*};/ms);
      if (!valueMatch) return;
      const value = valueMatch[0];

      const exists = existsSync(`./features/${key}`);

      return { key, exists, value };
    });

export const renderHandleBarTemplate = ({ path, templateFile, data }) => {
  const directory = path.split("/").slice(0, -1).join("/");
  if (!existsSync(directory)) mkdirSync(directory, { recursive: true });

  const test = readFileSync(templateFile).toString();
  const Template = handlebars.compile(test, {noEscape: true});
  const result = Template(data);
  writeFileSync(path, result);
};

export const appendFile = ({ stringToAppend, regex, path }) => {
  let mainLayoutFile = readFileSync(path).toString();

  const replacedFile = mainLayoutFile.replace(regex, `$& \n ${stringToAppend}`);

  writeFileSync(path, replacedFile);
};

export const returnTemplateArray = (key) => {
  return [
    {
      path: `./features/${changeCase.snakeCase(key)}/index.ts`,
      templateFile: "internals/feature/index.ts.hbs",
    },
    {
      path: `./features/${changeCase.snakeCase(key)}/types/index.ts`,
      templateFile: "internals/feature/types/index.ts.hbs",
    },
    {
      path: `./pages/${changeCase.snakeCase(key)}/[${changeCase.camelCase(
        key
      )}Id].tsx`,
      templateFile: "internals/feature/pages/SinglePage.tsx.hbs",
    },
    {
      path: `./pages/${changeCase.snakeCase(key)}/index.tsx`,
      templateFile: "internals/feature/pages/List.tsx.hbs",
    },
    {
      path: `./features/${changeCase.snakeCase(
        key
      )}/components/Create${changeCase.pascalCase(key)}.tsx`,
      templateFile: "internals/feature/components/Create.tsx.hbs",
    },
    {
      path: `./features/${changeCase.snakeCase(
        key
      )}/components/Delete${changeCase.pascalCase(key)}.tsx`,
      templateFile: "internals/feature/components/Delete.tsx.hbs",
    },
    {
      path: `./features/${changeCase.snakeCase(
        key
      )}/components/${changeCase.pascalCase(key)}sList.tsx`,
      templateFile: "internals/feature/components/List.tsx.hbs",
    },
    {
      path: `./features/${changeCase.snakeCase(
        key
      )}/components/Update${changeCase.pascalCase(key)}.tsx`,
      templateFile: "internals/feature/components/Update.tsx.hbs",
    },
    {
      path: `./features/${changeCase.snakeCase(
        key
      )}/api/create${changeCase.pascalCase(key)}.ts`,
      templateFile: "internals/feature/api/create.ts.hbs",
    },
    {
      path: `./features/${changeCase.snakeCase(
        key
      )}/api/delete${changeCase.pascalCase(key)}.ts`,
      templateFile: "internals/feature/api/delete.ts.hbs",
    },
    {
      path: `./features/${changeCase.snakeCase(
        key
      )}/api/get${changeCase.pascalCase(key)}.ts`,
      templateFile: "internals/feature/api/get.ts.hbs",
    },
    {
      path: `./features/${changeCase.snakeCase(
        key
      )}/api/get${changeCase.pascalCase(key)}s.ts`,
      templateFile: "internals/feature/api/getList.ts.hbs",
    },
    {
      path: `./features/${changeCase.snakeCase(
        key
      )}/api/update${changeCase.pascalCase(key)}.ts`,
      templateFile: "internals/feature/api/update.ts.hbs",
    },
  ];
};
