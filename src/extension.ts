import { commands, ExtensionContext, languages } from "vscode";

import { addOnly, removeOnly } from "./commands/only";
import FILE_SELECTOR from "./constants/fileSelector";
import OnlyCodeLensProvider from "./providers/OnlyCodeLensProvider";

export function activate(context: ExtensionContext) {
  context.subscriptions.push(
    languages.registerCodeLensProvider(
      FILE_SELECTOR,
      new OnlyCodeLensProvider()
    )
  );

  commands.registerTextEditorCommand("add-only.add.only", addOnly);
  commands.registerTextEditorCommand("add-only.remove.only", removeOnly);
}
