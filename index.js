const fs = require("fs");
const util = require("util");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const readLineAsync = util.promisify(rl.question).bind(rl);
const readFileAsync = util.promisify(fs.readFile);

async function main() {
  const path = await readLineAsync("Enter file path: ");
  rl.close();

  const contents = await readFileAsync(path, "utf8");
}
main();
