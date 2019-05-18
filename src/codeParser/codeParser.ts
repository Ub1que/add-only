import { parse, ParserOptions } from "@babel/parser";
import { addTokens, removeTokens } from "../constants/tokens";

function codeParser(sourceCode: any) {
  const parserOptions: ParserOptions = {
    plugins: ["jsx", "typescript"],
    sourceType: "module",
    tokens: true
  };
  const ast = parse(sourceCode, parserOptions);

  return ast.tokens
    .map(({ value, loc, type }, index) => {
      let removeTokenNext = false;

      if (
        (addTokens.includes(value) || removeTokens.includes(value)) &&
        type.label === "name" &&
        !!ast.tokens[index + 1].type.startsExpr
      ) {
        if (removeTokens.includes(ast.tokens[index + 2].value)) {
          removeTokenNext = true;
        }
        return { loc, value, removeTokenNext };
      }
    })
    .filter(Boolean);
}

export { codeParser };
