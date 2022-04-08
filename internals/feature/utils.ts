import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import * as handlebars from "handlebars";
import * as changeCase from "change-case";
import { readdir } from "fs/promises";
import { ParameterType } from "swagger-schema-official";

export const getDirectories = async (source: string) =>
  (await readdir(source, { withFileTypes: true }))
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

export const renderHandleBarTemplate = ({
  path,
  templateFile,
  data,
}: {
  path: string;
  templateFile: string;
  data: {};
}) => {
  const directory = path.split("/").slice(0, -1).join("/");
  if (!existsSync(directory)) mkdirSync(directory, { recursive: true });

  const test = readFileSync(templateFile).toString();
  const Template = handlebars.compile(test, { noEscape: true });
  const result = Template(data);
  writeFileSync(path, result);
};

export const appendFile = ({
  stringToAppend,
  regex,
  path,
}: {
  stringToAppend: string;
  regex: RegExp;
  path: string;
}) => {
  let mainLayoutFile = readFileSync(path).toString();

  const replacedFile = mainLayoutFile.replace(regex, `$& \n ${stringToAppend}`);

  writeFileSync(path, replacedFile);
};

export const convertSwaggerDataTypesToTypescriptTypes = ({
  type,
  format,
}: {
  type?: ParameterType;
  format?: string;
}) => {
  switch (type) {
    case "string":
      switch (format) {
        case "date":
          return "Date";
        case "date-time":
          return "Date";
        default:
          return "string";
      }
    case "integer":
      return "number";
    case "number":
      return type;
    case "boolean":
      return type;
    case "array":
      return type;
    case "object":
      return type;
    default:
      return "string";
  }
};

export const returnTemplateArray = (key: string) => {
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
