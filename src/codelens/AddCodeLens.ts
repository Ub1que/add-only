import { CodeLens, Range } from "vscode";

export default class AddCodeLens extends CodeLens {
  constructor(range: Range, tokenRange: Range) {
    super(range, {
      arguments: [tokenRange],
      command: "add-only.add.only",
      title: "Add only"
    });
  }
}
