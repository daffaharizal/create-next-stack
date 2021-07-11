import Command from "@oclif/command"
import { isGitInitialized } from "../../../helpers/is-git-initialized"
import { QuestionnaireAnswers } from "../../../questionnaire/questionnaire"
import { techValues } from "../../../questionnaire/questions/technologies"
import { installFormikStep } from "../install-formik"
import { installFramerMotionStep } from "../install-framer-motion"
import { installReactHookFormStep } from "../install-react-hook-form"
import { setUpEmotionStep } from "../set-up-emotion"
import { setUpLintStagedStep } from "../set-up-lint-staged"
import { setUpPrettierStep } from "../set-up-prettier"

export async function generateTechnologyTableRows(
  this: Command,
  answers: QuestionnaireAnswers
): Promise<string> {
  type TechnologyTableRow = {
    name: string
    links: string
    filter?: boolean
  }

  const technologies: TechnologyTableRow[] = [
    {
      name: /* md */ `[Next.js](https://nextjs.org/)`,
      links: /* md */ `[Docs](https://nextjs.org/docs) - [Learn Next.js](https://nextjs.org/learn) - [GitHub repo](https://github.com/vercel/next.js)`,
    },
    {
      name: /* md */ `[React](https://reactjs.org/)`,
      links: /* md */ `[Docs](https://reactjs.org/docs/getting-started.html) - [GitHub repo](https://github.com/facebook/react)`,
    },
    {
      name: /* md */ `[TypeScript](https://www.typescriptlang.org/)`,
      links: /* md */ `[Docs](https://www.typescriptlang.org/docs/) - [GitHub repo](https://github.com/microsoft/TypeScript)`,
    },
    {
      name: /* md */ `[Emotion](https://emotion.sh/docs/introduction)`,
      links: /* md */ `[Docs](https://emotion.sh/docs/introduction) - [GitHub repo](https://github.com/emotion-js/emotion)`,
      filter: setUpEmotionStep.shouldRun(answers),
    },
    {
      name: /* md */ `[CSS Modules](https://github.com/css-modules/css-modules)`,
      links: /* md */ `[Docs](https://github.com/css-modules/css-modules) - [Next.js-specific docs](https://nextjs.org/docs/basic-features/built-in-css-support#adding-component-level-css)`,
      filter: answers.technologies.includes(techValues.cssModules),
    },
    {
      name: /* md */ `[React Hook Form](https://react-hook-form.com/)`,
      links: /* md */ `[Docs](https://react-hook-form.com/get-started) - [GitHub repo](https://github.com/react-hook-form/react-hook-form)`,
      filter: installReactHookFormStep.shouldRun(answers),
    },
    {
      name: /* md */ `[Formik](https://formik.org/)`,
      links: /* md */ `[Docs](https://formik.org/docs/overview) - [GitHub repo](https://github.com/formium/formik)`,
      filter: installFormikStep.shouldRun(answers),
    },
    {
      name: /* md */ `[Framer Motion](https://www.framer.com/motion/)`,
      links: /* md */ `[Docs](https://www.framer.com/docs/) - [GitHub repo](https://github.com/framer/motion)`,
      filter: installFramerMotionStep.shouldRun(answers),
    },
    {
      name: /* md */ `[ESLint](https://eslint.org/)`,
      links: /* md */ `[Configuration](https://eslint.org/docs/user-guide/configuring/) - [Rules](https://eslint.org/docs/rules/) - [GitHub Repo](https://github.com/eslint/eslint)`,
    },
    {
      name: /* md */ `[Prettier](https://prettier.io/)`,
      links: /* md */ `[Docs](https://prettier.io/docs/en/index.html) - [Options](https://prettier.io/docs/en/options.html) - [GitHub repo](https://github.com/prettier/prettier)`,
      filter: setUpPrettierStep.shouldRun(answers),
    },
    {
      name: /* md */ `[Husky](https://typicode.github.io/husky/)`,
      links: /* md */ `[Docs](https://typicode.github.io/husky/) - [GitHub repo](https://github.com/typicode/husky)`,
      filter:
        (await isGitInitialized()) && setUpLintStagedStep.shouldRun(answers),
    },
    {
      name: /* md */ `[lint-staged](https://github.com/okonet/lint-staged)`,
      links: /* md */ `[GitHub repo](https://github.com/okonet/lint-staged)`,
      filter:
        (await isGitInitialized()) && setUpLintStagedStep.shouldRun(answers),
    },
    {
      name: /* md */ `[Yarn](https://yarnpkg.com/)`,
      links: /* md */ `[CLI Docs](https://yarnpkg.com/cli) - [GitHub repo](https://github.com/yarnpkg/berry)`,
    },
  ]

  const technologyRowsString = technologies
    .filter((technology) =>
      typeof technology.filter !== "undefined" ? technology.filter : true
    )
    .map((technology) => `|${technology.name}|${technology.links}|`)
    .join("\n")

  return technologyRowsString
}
