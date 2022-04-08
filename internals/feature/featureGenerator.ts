import {
  appendFile,
  getDirectories,
  renderHandleBarTemplate,
  returnTemplateArray,
  returnTypes,
} from "./utils";
import { pascalCase, snakeCase } from "change-case";
import { registerHelpers } from "./helpers";
import { Spec } from "swagger-schema-official";
import { readFileSync, writeFileSync } from "fs";

export enum modeEnum {
  FILEPATH = "filePath",
  SUPABASE = "supabase",
  URL = "URL",
}

export const featureGenerator = async ({
  swaggerSpecification,
  mode,
}: {
  swaggerSpecification: Spec;
  mode: modeEnum;
}) => {
  console.time("⏱ Generation time");

  const existingFeatureArray = await getDirectories("./features");

  registerHelpers();

  if (!swaggerSpecification.definitions)
    return console.error("No definitions provided on Swagger Specification");

  Object.entries(swaggerSpecification.definitions).forEach(([key, value]) => {
    const { types, typescriptTypes } = returnTypes({ value, key });
    if (existingFeatureArray.includes(key)) {
      // refresh types
      const path = `./features/${key}/types/index.ts`;

      const mainLayoutFile = readFileSync(path).toString();

      const regex = new RegExp(
        `export type ${pascalCase(key)}Type = {.*?}`,
        "s"
      );

      const replacedFile = mainLayoutFile.replace(
        regex,
        `export type ${pascalCase(key)}Type = ${typescriptTypes}`
      );

      writeFileSync(path, replacedFile);

      console.log(`🧑‍🔧 Feature ${key} was refreshed`);
    } else {
      // create new types
      const handleBarData = {
        name: key,
        value: typescriptTypes,
        types,
        axios: mode !== modeEnum.SUPABASE,
      };

      returnTemplateArray(key).forEach(({ path, templateFile }) => {
        console.log(`✅ ${path}`);
        renderHandleBarTemplate({
          path,
          templateFile,
          data: handleBarData,
        });
      });

      appendFile({
        stringToAppend: ` { name: "${key}", to: "/${snakeCase(
          key
        )}", icon: FolderIcon },`,
        regex: /{ name: ".*", to: ".*", icon: .* },/,
        path: "./components/Layout/MainLayout.tsx",
      });

      console.log(`🚀 New feature ${key} was generated`);
    }
  });
  console.timeEnd("⏱ Generation time");
};
