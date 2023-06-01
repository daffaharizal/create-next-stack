import { ValidCNSInputs } from "../../../create-next-stack-types"
import { compareByOrder } from "../../../helpers/sort-by-order"
import { filterPlugins } from "../../../setup/setup"

export const environmentVariablesSortOrder: string[] = [
  "NEXT_PUBLIC_WEBSITE_DOMAIN",
]

export const getSortedFilteredEnvironmentVariables = (
  inputs: ValidCNSInputs
) => {
  const pluginEnvironmentVariables = filterPlugins(inputs).flatMap(
    (plugin) => plugin.environmentVariables ?? []
  )
  return pluginEnvironmentVariables.sort((a, b) =>
    compareByOrder(a.name, b.name, environmentVariablesSortOrder)
  )
}
