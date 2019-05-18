import { Range, TextEditor, TextEditorEdit } from "vscode";

async function addOnly(
  textEditor: TextEditor,
  edit: TextEditorEdit,
  tokenRange: Range
) {
  edit.insert(tokenRange.end, ".only");
}

async function removeOnly(
  textEditor: TextEditor,
  edit: TextEditorEdit,
  tokenRange: Range
) {
  edit.delete(tokenRange);
}

export { addOnly, removeOnly };
