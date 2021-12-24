import { Range, TextEditor, TextEditorEdit } from "vscode";
import { state } from '../providers/OnlyCodeLensProvider'

async function addOnly(
  // @ts-ignore
  textEditor: TextEditor,
  edit: TextEditorEdit,
  tokenRange: Range
) {
  edit.insert(tokenRange.end, ".only");
}

async function removeOnly(
  // @ts-ignore
  textEditor: TextEditor,
  edit: TextEditorEdit,
  tokenRange: Range
) {
  edit.delete(tokenRange);
}

async function removeAllOnly(
  // @ts-ignore
  textEditor: TextEditor,
  edit: TextEditorEdit,
) {
  state.removeCodeLenses.forEach(codeLens => {
    const tokenRange = codeLens?.command?.arguments?.[0];

    if (tokenRange){
      edit.delete(tokenRange)
    }

  })
}

export { addOnly, removeOnly, removeAllOnly };
