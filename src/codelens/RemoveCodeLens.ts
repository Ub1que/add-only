import { CodeLens, Range } from "vscode";

export default class RemoveCodeLens extends CodeLens {
  constructor(range: Range, tokenRange: Range) {
    super(range, {
      arguments: [tokenRange],
      command: "add-only.remove.only",
      title: "Remove only"
    });
  }
}
