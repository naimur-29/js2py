const predefined = ["var", "let", "const"];
const operators = ["+", "-", "*", "/", "=", ";"];
const digits = "0123456789";

let identifierTable = {
  names: [],
  identifiers: [],
};

function symbolTableInit() {
  identifierTable = {
    names: [],
    identifiers: [],
  };
}
