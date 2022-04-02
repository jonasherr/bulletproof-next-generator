import openapiTS from "openapi-typescript";

import {OPENAPITSURL} from "../index.mjs";
import {getDefinitions, renderHandleBarTemplate, returnArrayWithFeaturesThatDontExist, returnTypes} from "./utils.mjs";
import * as changeCase from "change-case";
import {registerHelpers} from "./helpers.mjs";

export const featureGenerator = async () => {
  const output = await openapiTS(OPENAPITSURL);

  const definitions = getDefinitions(output);

  const allFeatures = returnArrayWithFeaturesThatDontExist(definitions)

  const newFeatures = allFeatures.filter(feature => !feature.exists)

  registerHelpers()

  newFeatures.forEach(({key, value}) => {
    renderHandleBarTemplate({
      path: `./features/${changeCase.snakeCase(key)}/index.ts`,
      templateFile: "generators/feature/index.ts.hbs",
      data: {name: key, value, types: returnTypes({value})}
    },)

    renderHandleBarTemplate({
      path: `./features/${changeCase.snakeCase(key)}/types/index.ts`,
      templateFile: "generators/feature/types/index.ts.hbs",
      data: {name: key, value, types: returnTypes({value})}
    },)
  })
};
