import { readLinesFromFile, readStringFromFile } from "../../utils";

let [template, rule_lines] = readStringFromFile(
  __dirname + "/input_test.txt"
).split("\n\n");

const rules: Record<string, string> = {};

rule_lines.split("\n").forEach((rule) => {
  const [key, value] = rule.split(" -> ");
  rules[key] = value;
});

console.log(rules);
console.log(template);
for (let step = 1; step < 41; step++) {
  let new_template = "";

  for (
    let template_index = 0;
    template_index < template.length - 1;
    template_index++
  ) {
    const key = template[template_index] + template[template_index + 1];
    //console.log("key", key, "value", rules[key]);
    new_template +=
      new_template === ""
        ? template[template_index] + rules[key] + template[template_index + 1]
        : rules[key] + template[template_index + 1];

    //console.log(new_template);
  }
  //console.log(new_template);
  template = new_template;
  console.log(step);
  //console.log(step, template, template.length);
}

let sums = [];
let new_template = "";
while (template.length > 0) {
  const element = template[0];
  new_template = template.replaceAll(element, "");
  sums.push(template.length - new_template.length);
  template = new_template;
}
sums = sums.sort((a, b) => b - a);
console.log(sums);
const diff = sums[0] - sums[sums.length - 1];
console.log(diff);
