import { Range, TextEditor, TextEditorEdit } from "vscode";

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

export { addOnly, removeOnly };
