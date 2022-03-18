const componentGenerator = require("./generators/component/index");
const featureGenerator = require("./generators/feature/index");

module.exports = function (plop) {
  plop.setGenerator("component", componentGenerator);
  plop.setGenerator("feature", featureGenerator);
  plop.setGenerator("store", featureGenerator);
  plop.setGenerator("migration", featureGenerator);
};
