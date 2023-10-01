const input = document.getElementById("input");
const output = document.getElementById("output");
const transpile = document.getElementById("transpile");

function transpilerInit() {
  output.value = "";
  symbolTableInit();
}

transpile.onclick = function () {
  if (!input.value) {
    output.value = "INVALID INPUT!";
    return;
  }

  transpilerInit();

  const cleanInput = input.value.trim();
  const lines = cleanInput.split(";").slice(0, -1);
  let tokenStream = "";

  for (let line of lines) {
    let lexemes = getLexemes(line);

    for (let lexeme of lexemes) {
      tokenStream += identifyToken(lexeme);
    }
    tokenStream += "\n";
  }

  output.value = tokenStream;
  console.log(identifierTable.identifiers);
};
