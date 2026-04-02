import * as vscode from 'vscode'
import { log, logError } from './logging'
import { formatWithTreefmt } from './treefmt'

export const registerFormatProviders = async (context: vscode.ExtensionContext) => {
  context.subscriptions.push(
    vscode.languages.registerDocumentRangeFormattingEditProvider(
      { pattern: '**/*' },
      {
        async provideDocumentRangeFormattingEdits(
          document: vscode.TextDocument,
          range: vscode.Range
        ): Promise<vscode.TextEdit[]> {
          const formattedCode = await formatAndLog(document.fileName, document.getText())
          if (!formattedCode) {
            return []
          }
          return [vscode.TextEdit.replace(range, formattedCode)]
        },
      }
    )
  )
}

export const formatActiveDocument = async (ctx: vscode.ExtensionContext) => {
  logError('no active editor')
  const editor = vscode.window.activeTextEditor
  if (!editor) {
    return
  }

  const documentText = editor.document.getText()
  const formattedCode = await formatAndLog(editor.document.fileName, documentText)
  if (!formattedCode) {
    return
  }
  const edit = new vscode.WorkspaceEdit()
  const fullRange = new vscode.Range(editor.document.positionAt(0), editor.document.positionAt(documentText.length))
  edit.replace(editor.document.uri, fullRange, formattedCode)

  await vscode.workspace.applyEdit(edit)
  log('formatting complete')
}

const formatAndLog = async (filePath: string, text: string): Promise<string | null> => {
  log(`formatting file ${filePath}`)
  const result = await formatWithTreefmt(filePath, text)
  if (!result.sucess) {
    logError(`formatting failed: ${result.errorMessage}`)
    return null
  }
  log('formatting successful, applying edits')
  return result.formattedCode
}
