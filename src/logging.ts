import * as vscode from 'vscode'
import { EXTENSION_NAME } from './constants'

const outputChannel = vscode.window.createOutputChannel('VanCoding Treefmt')

export const log = (message: string) => {
  console.log(`[${EXTENSION_NAME}] ${message}`)
  outputChannel.appendLine(`[${new Date().toISOString()}] ${message}`)
}

export const logError = (message: string) => {
  log(`${message}`)
  vscode.window.showErrorMessage(message)
}
