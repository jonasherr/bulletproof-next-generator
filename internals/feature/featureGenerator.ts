import {
  appendFile,
  convertSwaggerDataTypesToTypescriptTypes,
  getDirectories,
  renderHandleBarTemplate,
  returnTemplateArray,
} from "./utils";
import { camelCase, snakeCase } from "change-case";
import { registerHelpers } from "./helpers";
import { Spec } from "swagger-schema-official";

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
    if (existingFeatureArray.includes(key)) {
      // refresh types
      /*
       * - features/feature/types/index.ts
       * */
      console.log(`🧑‍🔧 Feature ${key} was refreshed`);
    } else {
      // create new types
      const { required: requiredProperties, properties } = value;

      if (!requiredProperties || !properties)
        return console.error(`A random error occurred when generating ${key}`);

      const types = Object.entries(properties).map(([key, value]) => {
        return {
          name: key,
          type: convertSwaggerDataTypesToTypescriptTypes({
            type: value.type,
            format: value.format,
          }),
          optional: !requiredProperties.includes(key),
          primaryKey: value.description?.includes("<pk/>"),
          foreignKey: value.description?.includes("<fk"),
        };
      });

      let typescriptTypes = "{\n";
      types.forEach((type) => {
        typescriptTypes += `  ${camelCase(type.name)}${
          type.optional ? "?" : ""
        }: ${type.type}, \n`;
      });
      typescriptTypes += "}";

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
