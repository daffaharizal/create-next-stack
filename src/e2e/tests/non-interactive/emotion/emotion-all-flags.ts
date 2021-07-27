import execa from "execa"
import { checkFormattingLintingBuild } from "../../../helpers/check-formatting-linting-build"
import { prepareE2eTest } from "../../../helpers/prepare-e2e-test"
import { logTestInfo } from "../../../helpers/test-logging"

export const testEmotionAllFlagsNonInteractive = async (
  createNextStackDir: string
) => {
  const { pathToProdCLI, runDirectory } = await prepareE2eTest(
    createNextStackDir
  )

  const args = [
    "--debug",
    "--package-manager=npm",
    "--prettier",
    "--styling=emotion",
    "--react-hook-form",
    "--formik",
    "--framer-motion",
    "--formatting-pre-commit-hook",
    ".",
  ]

  logTestInfo(`Running command: ${pathToProdCLI} ${args.join(" ")}`)

  const execaProcess = execa(pathToProdCLI, args, {
    timeout: 10 * 60 * 1000, // 10 minutes
    cwd: runDirectory,
  })

  execaProcess.stdout?.pipe(process.stdout)
  execaProcess.stderr?.pipe(process.stderr)

  await execaProcess

  await checkFormattingLintingBuild("npm", runDirectory)
}
