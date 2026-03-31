import * as vscode from "vscode";
import { getFormattedTextFromTreefmt, runTreefmtWithStdin } from "./treefmtUtils";
import { log, outputChannel } from "./utils";

let ctx: vscode.ExtensionContext;

export async function activate(context: vscode.ExtensionContext) {
  log("Activating Treefmt extension");
  ctx = context;

  context.subscriptions.push(
    vscode.commands.registerCommand("extension.runTreefmt", () => runTreefmtWithStdin(ctx)),
  );

  // Re-register or unregister the formatting providers when settings change
  context.subscriptions.push(
    vscode.workspace.onDidChangeConfiguration(async (e) => {
      log("omg");
    }),
  );

  outputChannel.show(true);

  await registerFormatProviders(context);
}

async function registerFormatProviders(context: vscode.ExtensionContext) {
  const registeredLanguages = await vscode.languages.getLanguages();
  const documentSelector: vscode.DocumentFilter[] = registeredLanguages.map((language) => {
    return { scheme: "file", language };
  });
  log("documentSelector: " + JSON.stringify(documentSelector));

  outputChannel.show(true);

  context.subscriptions.push(
    vscode.languages.registerDocumentRangeFormattingEditProvider(
      { pattern: "**/*" }, // Match all files
      {
        async provideDocumentRangeFormattingEdits(
          document: vscode.TextDocument,
          range: vscode.Range,
        ): Promise<vscode.TextEdit[]> {
          log(`Range formatting requested for: ${document.fileName}`);

          const formattedText = await getFormattedTextFromTreefmt(ctx, document.getText(range));
          if (formattedText === null) {
            console.log("formatting failed");
            return [];
          }

          console.log("updating file...");

          return [vscode.TextEdit.replace(range, formattedText)];
        },
      },
    ),
  );
}

export function deactivate() {}
