import { runCommand } from "../../../main/helpers/run-command"
import { logTestMeta } from "../helpers/log-test-meta"
import { minutesToMilliseconds } from "../helpers/minutes-to-milliseconds"
import { prepareE2eTest } from "../helpers/prepare-e2e-test"

export const testNoFlags = async (
  createNextStackDir: string
): Promise<void> => {
  logTestMeta(testNoFlags.name, __filename)

  const { pathToCLI, runDirectory } = await prepareE2eTest(createNextStackDir)

  const argsVariants: string[][] = [
    //
    ["app-name"],
    ["app-name --debug"],
  ]

  for (const args of argsVariants) {
    await runCommand(pathToCLI, args, {
      timeout: minutesToMilliseconds(1),
      cwd: runDirectory,
    }).catch((error) => {
      if (
        !error.stderr.includes("Missing required flag package-manager") ||
        !error.stderr.includes("Missing required flag styling")
      ) {
        console.log("throwing error")
        throw new Error("Expected create-next-stack to error on missing flags.")
      }
    })
  }
}
