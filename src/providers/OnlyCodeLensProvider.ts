import { CodeLens, CodeLensProvider, Range, TextDocument } from "vscode";

import AddCodeLens from "../codelens/AddCodeLens";
import RemoveCodeLens from "../codelens/RemoveCodeLens";
import getLocations from "../codeParser/codeParser";

export default class OnlyCodeLensProvider implements CodeLensProvider {
  public provideCodeLenses(
    document: TextDocument
  ): CodeLens[] | Thenable<CodeLens[]> {
    const createRangeForCodeLens = ({ line }) =>
      document.lineAt(line - 1).range;

    return getLocations(document.getText()).map(
      ({location, type}) => {
        if (type === 'add'){
          return new AddCodeLens(
            createRangeForCodeLens(location.end),
            new Range(
              location.start.line - 1,
              location.start.column,
              location.end.line - 1,
              location.end.column
            )
          )
        }

        if (type === 'remove'){
          return new RemoveCodeLens(
            createRangeForCodeLens(location.end),
            new Range(
              location.start.line - 1,
              location.start.column - 1,
              location.end.line - 1,
              location.end.column
            )
          )
        }
      }
    )
  }

  public resolveCodeLens?(): CodeLens | Thenable<CodeLens> {
    return;
  }
}
