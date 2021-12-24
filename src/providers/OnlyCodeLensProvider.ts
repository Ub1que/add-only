import { CodeLens, CodeLensProvider, Range, TextDocument } from "vscode";

import AddCodeLens from "../codelens/AddCodeLens";
import RemoveCodeLens from "../codelens/RemoveCodeLens";
import getLocations from "../codeParser/codeParser";

interface IState {
  addCodeLenses: any[],
  removeCodeLenses: any[]
}

export const state : IState = {
  addCodeLenses: [],
  removeCodeLenses: []
};

export default class OnlyCodeLensProvider implements CodeLensProvider {
  public updateRemoveOnlyButton: (locations: any[]) => any;

  constructor(updateRemoveOnlyButton){
    this.updateRemoveOnlyButton = updateRemoveOnlyButton;
  }

  public provideCodeLenses(
    document: TextDocument
  ): CodeLens[] | Thenable<CodeLens[]> {
    const createRangeForCodeLens = ({ line }) =>
      document.lineAt(line - 1).range;

    try {
      const locations = getLocations(document.getText());

      const addCodeLenses = locations
        .filter(({type}) => type === 'add')
        .map(({location}) => new AddCodeLens(
          createRangeForCodeLens(location.end),
          new Range(
            location.start.line - 1,
            location.start.column,
            location.end.line - 1,
            location.end.column
          )
        ))

      const removeCodeLenses = locations
        .filter(({type}) => type === 'remove')
        .map(({location}) => new RemoveCodeLens(
          createRangeForCodeLens(location.end),
          new Range(
            location.start.line - 1,
            location.start.column === 0 ? 0 : location.start.column - 1,
            location.end.line - 1,
            location.end.column
          )
        ))

      state.addCodeLenses = addCodeLenses;
      state.removeCodeLenses = removeCodeLenses;

      this.updateRemoveOnlyButton(removeCodeLenses);

      return [...state.addCodeLenses, ...state.removeCodeLenses];
    } catch (error) {
      return [...state.addCodeLenses, ...state.removeCodeLenses];
    }
  }

  public resolveCodeLens?(): CodeLens | Thenable<CodeLens> {
    return;
  }
}
