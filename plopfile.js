import componentGenerator from "./generators/component/index.js";
import featureGenerator from "./generators/feature/index.js";

export const OPENAPITSURL =
  "https://sidvhwpbhgmlmhvqdtlf.supabase.co/rest/v1/?apikey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNpZHZod3BiaGdtbG1odnFkdGxmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDY5ODk2MzgsImV4cCI6MTk2MjU2NTYzOH0.SFl-5eU-Y-2Y-jgc4DbEH8TpoHbp-VkVzeoVH5uzJbg";

/*const renderHandleBarTemplate = ({ path, templateFile, data }) => {
  const test = fs.readFileSync(templateFile).toString();
  const Template = Handlebars.compile(test);
  const result = Template(data);
  fs.writeFileSync(path, result);
};*/

export default function PlopImplementation(plop) {
  plop.setGenerator("feature", featureGenerator);
  plop.setGenerator("component", componentGenerator);
  plop.setGenerator("store", featureGenerator);
  plop.setGenerator("migration", featureGenerator);
}
