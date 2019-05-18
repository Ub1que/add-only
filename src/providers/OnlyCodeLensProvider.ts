import { CodeLens, CodeLensProvider, Range, TextDocument } from "vscode";

import AddCodeLens from "../codelens/AddCodeLens";
import RemoveCodeLens from "../codelens/RemoveCodeLens";
import { codeParser } from "../codeParser/codeParser";
import { addTokens, removeTokens } from "../constants/tokens";

export default class OnlyCodeLensProvider implements CodeLensProvider {
  public provideCodeLenses(
    document: TextDocument
  ): CodeLens[] | Thenable<CodeLens[]> {
    const createRangeForCodeLens = ({ line }) =>
      document.lineAt(line - 1).range;

    return codeParser(document.getText()).reduce(
      (acc, { loc, value, removeTokenNext }) => {
        if (addTokens.includes(value) && !removeTokenNext) {
          return [
            ...acc,
            new AddCodeLens(
              createRangeForCodeLens(loc.end),
              new Range(
                loc.start.line - 1,
                loc.start.column,
                loc.end.line - 1,
                loc.end.column
              )
            )
          ];
        } else if (removeTokens.includes(value)) {
          return [
            ...acc,
            new RemoveCodeLens(
              createRangeForCodeLens(loc.end),
              new Range(
                loc.start.line - 1,
                loc.start.column - 1,
                loc.end.line - 1,
                loc.end.column
              )
            )
          ];
        } else {
          return [...acc];
        }
      },
      []
    );
  }

  public resolveCodeLens?(): CodeLens | Thenable<CodeLens> {
    return;
  }
}
