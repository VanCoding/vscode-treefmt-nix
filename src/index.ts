import * as vscode from 'vscode'
import { EXTENSION_NAME } from './constants'
import { formatActiveDocument, registerFormatProviders } from './formatting'
import { log } from './logging'

export async function activate(context: vscode.ExtensionContext) {
  log(`activating ${EXTENSION_NAME}`)

  context.subscriptions.push(vscode.commands.registerCommand('extension.runTreefmt', formatActiveDocument))

  await registerFormatProviders(context)
  log(`${EXTENSION_NAME} activated`)
}

export function deactivate() {
  log(`deactivating ${EXTENSION_NAME}`)
}
