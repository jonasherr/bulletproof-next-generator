import * as changeCase from "change-case";
import * as handlebars from "handlebars";

export const registerHelpers = () => {
  handlebars.registerHelper(
    "turnIntoInterpolationVariableWithId",
    function (text) {
      const result = "${" + text + "Id}";
      return new handlebars.SafeString(result);
    }
  );

  handlebars.registerHelper("isBoolean", function (value) {
    return value === "boolean";
  });

  handlebars.registerHelper("isNumber", function (value) {
    return value === "number";
  });

  handlebars.registerHelper("apostropheCase", (string) => {
    if (string.includes(" ")) return `"${string}"`;
    return string;
  });
  handlebars.registerHelper("camelCase", (string) => {
    return changeCase.camelCase(string);
  });
  handlebars.registerHelper("snakeCase", (string) => {
    return changeCase.snakeCase(string);
  });
  handlebars.registerHelper("dotCase", (string) => {
    return changeCase.dotCase(string);
  });
  handlebars.registerHelper("pathCase", (string) => {
    return changeCase.pathCase(string);
  });
  handlebars.registerHelper("lowerCase", (string) => {
    return string.toLowerCase();
  });
  handlebars.registerHelper("upperCase", (string) => {
    return string.toUpperCase();
  });
  handlebars.registerHelper("sentenceCase", (string) => {
    return changeCase.sentenceCase(string);
  });
  handlebars.registerHelper("constantCase", (string) => {
    return changeCase.constantCase(string);
  });
  handlebars.registerHelper("dashCase", (string) => {
    return changeCase.paramCase(string);
  });
  handlebars.registerHelper("kabobCase", (string) => {
    return changeCase.paramCase(string);
  });
  handlebars.registerHelper("kebabCase", (string) => {
    return changeCase.paramCase(string);
  });
  handlebars.registerHelper("properCase", (string) => {
    return changeCase.pascalCase(string);
  });
  handlebars.registerHelper("pascalCase", (string) => {
    return changeCase.pascalCase(string);
  });
};
