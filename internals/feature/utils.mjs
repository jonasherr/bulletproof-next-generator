import {existsSync, mkdirSync, readFileSync, writeFileSync} from "fs";
import handlebars from "handlebars";

export const returnTypes = ({ value }) => {
  const valueArray = value.match(/(?=\/\*\*).+?(?=;)/gs);

  return valueArray.map((value) => {
    let arrayObject = {};
    const type = value.match(/(?<=\s{2})(\w|\?)*: \w*/gi)[0];

    arrayObject.name = type.match(/(\w)*(?=([?:]))/i)[0];
    arrayObject.type = type.match(/(?<=:\s)\S*/i)[0];
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

    return arrayObject
  }).filter(
      (object) => object.name !== "id" && object.name !== "created_at"
  );
};

export const getDefinitions = (output) => {
  return output
    .replace(/.*(?=export interface definitions)/gms, "")
    .replace(/(?<=export interface parameters).*/gms, "")
    .replace("export interface parameters", "")
    .replace("export interface definitions {", "")
    .split(/(?<=};).*/g);
};

export const returnArrayWithFeaturesThatDontExist = (definitions) => definitions
      .filter((definition) => definition.length > 10)
      .map((definition) => {
        if (!definition) return;

        const keyMatch = definition.match(/\w*:/);
        if (!keyMatch) return;
        const key = keyMatch[0].replace(":", "");

        const valueMatch = definition.match(/{.*};/ms);
        if (!valueMatch) return;
        const value = valueMatch[0];

        const exists = existsSync(`./features/${key}`)

        return {key, exists, value}}

      )

export const renderHandleBarTemplate = ({ path, templateFile, data }) => {
    const directory = path.split("/").slice(0, -1).join("/")
    if (!existsSync(directory)) mkdirSync(directory, { recursive: true})

    const test = readFileSync(templateFile).toString();
    const Template = handlebars.compile(test);
    const result = Template(data);
    writeFileSync(path, result);
};

