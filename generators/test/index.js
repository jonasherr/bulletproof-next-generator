const { log } = require("console");
const openapiTS = require("openapi-typescript");

module.exports = {
  description: "Test",
  prompts: [
    {
      type: "input",
      name: "name",
      message: "feature name",
    },
  ],
  /*actions: [
                          {
                            type: "add",
                            path: "types/test.ts",
                            template: "types/template.ts.hbs",
                          },
                        ],*/
  actions: function (data) {
    let actions = [];

    log("Hi");

    openapiTS("https://myurl.com/v1/openapi.yaml").then((response) =>
      log(response)
    );

    log(output);

    actions.push({
      type: "add",
      path: "types/test.ts",
      template: "types/template.ts.hbs",
    });

    return actions;
  },
};
