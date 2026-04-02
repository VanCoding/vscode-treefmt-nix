import { execFile } from 'child_process'
import { log } from './logging'

export async function formatWithTreefmt(
  filePath: string,
  text: string
): Promise<
  | {
      sucess: true
      formattedCode: string
    }
  | {
      sucess: false
      errorMessage: string
    }
> {
  return new Promise((resolve) => {
    log('starting treefmt process')
    const childProcess = execFile(
      'treefmt',
      ['--stdin', filePath],

      (error, stdout, stderr) => {
        log('treefmt process exited')
        if (error) {
          resolve({
            sucess: false,
            errorMessage: stderr,
          })
          return
        }
        resolve({
          sucess: true,
          formattedCode: stdout,
        })
      }
    )

    if (childProcess.stdin) {
      childProcess.stdin.end(text)
    } else {
      log("couldn't start treefmt process")
      resolve({
        sucess: false,
        errorMessage: 'could not start treefmt process',
      })
    }
  })
}
