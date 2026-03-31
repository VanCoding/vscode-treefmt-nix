import * as vscode from "vscode";
export const outputChannel = vscode.window.createOutputChannel("VanCoding Treefmt");
export function log(message: string, forceShow: boolean = false): void {
  console.log(`[Treefmt] ${message}`);
  outputChannel.appendLine(`[${new Date().toISOString()}] ${message}`);
  //outputChannel.show()
}
