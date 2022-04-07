import {OPENAPITSURL} from "../index.mjs";
import axios from "axios";
import {appendFile, getDirectories, renderHandleBarTemplate, returnTemplateArray,} from "./utils.mjs";
import {camelCase, snakeCase} from "change-case";
import {registerHelpers} from "./helpers.mjs";

export const featureGenerator = async () => {
  console.time("⏱ Generation time");

  const { data: swaggerSpecification } = await axios(OPENAPITSURL);

  const existingFeatureArray = await getDirectories("./features");

  registerHelpers();

  Object.entries(swaggerSpecification.definitions).forEach(([key, value]) => {
    if (existingFeatureArray.includes(key)) {
      // refresh types
      /*
       * - features/feature/types/index.ts
       * - optional: features/feature/components/create + features/feature/api/create
       * - optional: features/feature/components/update + features/feature/api/update
       * - optional: features/feature/components/list
       * */
      console.log(`🧑‍🔧 Feature ${key} was refreshed`);
    } else {
      // create new types
      const { required: requiredProperties, properties } = value;

      /*
       * Types structure:
       *
       * name: string (name of the type example commentId)
       * type: Typescript type (actual typescript type)
       * optional: boolean
       * primaryKey?: true
       * foreignKey?: true
       *
       * */
      const types = Object.entries(properties).map(([key, value]) => {
        return {
          name: key,
          type: value.type,
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

      returnTemplateArray(key).forEach(({ path, templateFile }) => {
        console.log(`✅ ${path}`);
        renderHandleBarTemplate({
          path,
          templateFile,
          data: { name: key, value: typescriptTypes, types },
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
