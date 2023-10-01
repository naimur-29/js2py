// let a = 0;

function getLexemes(line) {
  let res = line.trim();

  return res.split(" ");
}

function identifyToken(lexeme) {
  if (predefined.includes(lexeme)) {
    return "<" + lexeme + ">";
  } else if (operators.includes(lexeme)) {
    return "<" + lexeme + ">";
  } else if (digits.includes(lexeme[0]) || operators.includes(lexeme[0])) {
    return "<" + lexeme + ">";
  } else {
    let variable;

    if (!identifierTable.names.includes(lexeme)) {
      variable = {
        id: identifierTable.names.length,
        name: lexeme,
      };

      identifierTable.identifiers.push(variable);
      identifierTable.names.push(lexeme);
    } else {
      variable =
        identifierTable.identifiers[identifierTable.names.indexOf(lexeme)];
    }

    return "<var, " + variable.id + ">";
  }
}
