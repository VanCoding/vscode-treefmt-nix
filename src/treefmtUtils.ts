import { execFile } from "child_process";
import * as vscode from "vscode";
import { log, outputChannel } from "./utils"; // Import the shared log function

export async function getFormattedTextFromTreefmt(
  ctx: vscode.ExtensionContext,
  text: string,
): Promise<string> {
  log("Running treefmt with stdin");
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    vscode.window.showInformationMessage("No active editor found.");
    return text;
  }

  log("Formatting file: " + editor.document.fileName);

  return new Promise((resolve, reject) => {
    const childProcess = execFile(
      "treefmt",
      ["--stdin", editor.document.fileName],

      (error, stdout, stderr) => {
        log("callback called");
        if (error) {
          const isSyntaxError = /error|invalid|parse|syntax/i.test(stderr);
          if (isSyntaxError) {
            log(`[treefmt] Formatter error: ${stderr}`);
            resolve(text);
            return;
          }
          log(`Error running stdin command: ${stderr}`);
          vscode.window.showErrorMessage(`Error running treefmt: ${stderr}`);
          reject(stderr);
          return;
        }
        log("this did work:"+stdout);
        resolve(stdout);
      },
    );

    if (childProcess.stdin) {
      childProcess.stdin.end(text);
    } else {
      log("ERROR: No stdin available on child process");
      reject("No stdin available on child process");
    }
  });
}

export async function runTreefmtWithStdin(ctx: vscode.ExtensionContext) {
  log("Executing runTreefmtWithStdin command");
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    return;
  }

  const documentText = editor.document.getText();
  const formattedText = await getFormattedTextFromTreefmt(ctx, documentText);
  if (formattedText === null) {
    return;
  }

  const edit = new vscode.WorkspaceEdit();
  const fullRange = new vscode.Range(
    editor.document.positionAt(0),
    editor.document.positionAt(documentText.length),
  );
  edit.replace(editor.document.uri, fullRange, formattedText);

  await vscode.workspace.applyEdit(edit);

  vscode.window.setStatusBarMessage("treefmt formatting complete", 3000);
}
