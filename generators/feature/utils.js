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
    return arrayObject.filter(
      (object) => object.name !== "id" && object.name !== "created_at"
    );
  });
};

export const getDefinitions = (output) => {
  return output
    .replace(/.*(?=export interface definitions)/gms, "")
    .replace(/(?<=export interface parameters).*/gms, "")
    .replace("export interface parameters", "")
    .replace("export interface definitions {", "")
    .split(/(?<=};).*/g);
};
