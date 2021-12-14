import { Argument, Command, InvalidArgumentError, Option } from "commander"
import fs, { PathLike } from "fs-extra"
import inquirer from "inquirer"
import { performance } from "perf_hooks"
import { readInput } from "./utils"

type Program = (input: string[]) => number
type ProgramImport = { default: Program }
type PromptResult = { shouldOverride: boolean }

function parseDay(day: string): string {
  const parsed = parseInt(day)

  if (!Number.isInteger(parsed)) {
    throw new InvalidArgumentError("Must be a number")
  } else if (parsed < 1 || parsed > 25) {
    throw new InvalidArgumentError("Must be a number between 1 and 25")
  }

  return day
}

const runCommand = new Command("run")
  .addArgument(new Argument("<day>", "the day to run (should be between 1 and 25)").argParser(parseDay))
  .addArgument(new Argument("<part>", "the part to run").choices(["1", "2"]))
  .addArgument(new Argument("[file]", "a file path with the input"))
  .addOption(new Option("-t, --time", "if the run should be timed"))
  .action(async (day: string, part: string, file: PathLike | undefined, options: { time?: boolean }) => {
    let dayProgram: Program
    let input: string[]

    try {
      const programImport = (await import(`./day${day}/part${part}`)) as ProgramImport

      dayProgram = programImport.default
    } catch (e) {
      console.error(`Did not find program for day ${day} part ${part}`)
      return
    }

    try {
      input = await readInput(file || process.stdin.fd)
    } catch {
      console.error(`Could not read input from ${file?.toString() || "stdin"}`)
      return
    }

    if (input.length === 0) {
      console.error("Input is expected to be passed on stdin and cannot be empty")
      return
    }

    const startTime = performance.now()
    const output = dayProgram(input)
    const endTime = performance.now()

    console.log(output)

    if (options.time) {
      console.log(`Algorithm took ${(endTime - startTime).toPrecision(2)}ms.`)
    }
  })

const newCommand = new Command("new")
  .addArgument(new Argument("<day>", "the day to run (should be between 1 and 25)").argParser(parseDay))
  .addArgument(new Argument("<part>", "the part to run").choices(["1", "2"]))
  .action(async (day: string, part: string) => {
    const dayFile = `
      export default function day${day}_part${part}(input: string[]): number {
        return 0
      }
    `
      .replace(/^ {4,6}/gm, "")
      .trimStart()

    const testFile = `
      import { readInput } from "../../utils"
      import day${day}_part${part} from "./index"
      
      describe("day ${day} part ${part}", () => {
        test("example", () => {
          const example = [
            ""
          ]
      
          const result = day${day}_part${part}(example)
      
          expect(result).toEqual(-1)
        })
      
        test("input", async () => {
          const input = await readInput("day${day}/input.txt")
          const result = day${day}_part${part}(input)
      
          expect(result).toEqual(-1)
        })
      })
    `
      .replace(/^ {4,6}/gm, "")
      .trimStart()

    const dayPath = `day${day}`
    const partPath = `${dayPath}/part${part}`

    if (await fs.pathExists(partPath)) {
      const result = await inquirer.prompt<PromptResult>([
        {
          type: "confirm",
          name: "shouldOverride",
          message: "This solution does already exist. Do you want to override?",
        },
      ])

      if (!result.shouldOverride) {
        return
      }
    }

    await fs.mkdirs(partPath)

    await Promise.all([
      fs.appendFile(`${dayPath}/input.txt`, ""),
      fs.writeFile(`${partPath}/index.ts`, dayFile),
      fs.writeFile(`${partPath}/index.spec.ts`, testFile),
    ])
  })

new Command()
  .version("1.0.0", "-v, --version")
  .name("advent-of-code-2021")
  .addCommand(runCommand)
  .addCommand(newCommand)
  .parse(process.argv)
