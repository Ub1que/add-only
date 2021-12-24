import { commands, ExtensionContext, languages, StatusBarAlignment, StatusBarItem, window, workspace } from "vscode";

import { addOnly, removeAllOnly, removeOnly } from "./commands/only";
import FILE_SELECTOR from "./constants/fileSelector";
import OnlyCodeLensProvider from "./providers/OnlyCodeLensProvider";

let removeAllOnlyButton: StatusBarItem;

function updateRemoveAllOnlyButton(locations): any {
  const removeAllOnlyOption = workspace.getConfiguration('AddOnly').removeAllOnlyButton;
  
  if (!removeAllOnlyOption){
    removeAllOnlyButton.hide();
    return;
  }

  if (locations.length > 0) {
    removeAllOnlyButton.show();
  } else {
    removeAllOnlyButton.hide();
  }
}

export function activate(context: ExtensionContext) {
  context.subscriptions.push(
    languages.registerCodeLensProvider(
      FILE_SELECTOR,
      new OnlyCodeLensProvider(updateRemoveAllOnlyButton)
    )
  );

  commands.registerTextEditorCommand("add-only.add.only", addOnly);
  commands.registerTextEditorCommand("add-only.remove.only", removeOnly);
  commands.registerTextEditorCommand("add-only.remove.all.only", removeAllOnly);

  // StatusBar connect Browser button
  removeAllOnlyButton = window.createStatusBarItem(
    StatusBarAlignment.Left,
    0
  );

  removeAllOnlyButton.text = "$(close) Remove all only";
  removeAllOnlyButton.command = "add-only.remove.all.only";
  context.subscriptions.push(removeAllOnlyButton);
}
