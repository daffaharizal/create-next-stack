import { throwError } from "../../error-handling"
import { commandInstance } from "../../instance"
import { packages, yarnAdd } from "../packages"
import { Step } from "../step"

export const installReactHookFormStep: Step = {
  shouldRun: async (inputs) => Boolean(inputs.flags["react-hook-form"]),

  run: async () => {
    const instance = commandInstance.get()
    instance.log("Installing React Hook Form...")

    try {
      await yarnAdd(packages["react-hook-form"])
    } catch (error) {
      throwError("An error occurred while installing React Hook Form.", error)
    }
  },
}
