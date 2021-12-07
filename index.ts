import { PathLike } from "fs"
import { Argument, Command, InvalidArgumentError } from "commander"
import { readInput } from "./utils"

type Program = (input: string[]) => number
type ProgramImport = { default: Program }

function parseDay(day: string): string {
  const parsed = parseInt(day)

  if (!Number.isInteger(parsed)) {
    throw new InvalidArgumentError("Must be a number")
  } else if (parsed < 1 || parsed > 25) {
    throw new InvalidArgumentError("Must be a number between 1 and 25")
  }

  return day
}

new Command()
  .version("1.0.0", "-v, --version")
  .name("advent-of-code-2021")
  .addArgument(new Argument("<day>", "the day to run (should be between 1 and 25)").argParser(parseDay))
  .addArgument(new Argument("<part>", "the part to run").choices(["1", "2"]))
  .addArgument(new Argument("[file]", "a file path with the input"))
  .action(async (day: string, part: string, file?: PathLike) => {
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

    const output = dayProgram(input)

    console.log(output)
  })
  .parse(process.argv)
