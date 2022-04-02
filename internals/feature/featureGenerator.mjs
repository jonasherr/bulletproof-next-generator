import openapiTS from "openapi-typescript";

import * as changeCase from "change-case";

import {OPENAPITSURL} from "../index.mjs";
import {
    appendFile,
    getDefinitions,
    renderHandleBarTemplate,
    returnArrayWithFeaturesThatDontExist,
    returnTemplateArray,
    returnTypes,
} from "./utils.mjs";
import {registerHelpers} from "./helpers.mjs";

export const featureGenerator = async () => {
    console.time("⏱ Generation time");

    const output = await openapiTS(OPENAPITSURL);

    const definitions = getDefinitions(output);

    const allFeatures = returnArrayWithFeaturesThatDontExist(definitions);

    const newFeatures = allFeatures.filter((feature) => !feature.exists);

    registerHelpers()

    if (newFeatures.length > 0) {
        // create new types
        newFeatures.forEach(({key, value}) => {
            returnTemplateArray(key).forEach(({path, templateFile}) => {
                console.log(`✅ ${path}`);
                console.log(value)
                renderHandleBarTemplate({
                    path,
                    templateFile,
                    data: {name: key, value, types: returnTypes({value})},
                });
            });

            appendFile({
                stringToAppend: ` { name: "${key}", to: "/${changeCase.snakeCase(
                    key
                )}", icon: FolderIcon },`,
                regex: /{ name: ".*", to: ".*", icon: .* },/,
                path: "./components/Layout/MainLayout.tsx",
            });
        });
    } else {
        // refresh types
        /*
        * - features/feature/types/index.ts
        * - optional: features/feature/components/create + features/feature/api/create
        * - optional: features/feature/components/update + features/feature/api/update
        * - optional: features/feature/components/list
        * */
    }

    console.log(newFeatures.length > 0 ? "🚀 New features were generated" : "🧑‍🔧 Feature types were refreshed");

    console.timeEnd("⏱ Generation time");
};
