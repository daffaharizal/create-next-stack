import { prettyCommand } from "../../../../main/helpers/pretty-command"
import { runCommand } from "../../../../main/helpers/run-command"
import { checkFormattingLintingBuild } from "../../helpers/check-formatting-linting-build"
import { minutesToMilliseconds } from "../../helpers/minutes-to-milliseconds"
import { prepareE2eTest } from "../../helpers/prepare-e2e-test"
import { logTestInfo } from "../../test-logging"

export const testEmotionOnly = async (
  createNextStackDir: string
): Promise<void> => {
  logTestInfo(`Running test: ${testEmotionOnly.name}`)

  const { pathToCLI, runDirectory } = await prepareE2eTest(createNextStackDir)

  const args = ["--debug", "--package-manager=pnpm", "--styling=emotion", "."]

  logTestInfo(
    "Running command:",
    prettyCommand(pathToCLI, args),
    "in directory:",
    runDirectory
  )

  await runCommand(pathToCLI, args, {
    timeout: minutesToMilliseconds(10),
    cwd: runDirectory,
    stdout: "inherit",
    stderr: "inherit",
  })

  await checkFormattingLintingBuild(runDirectory)
}
