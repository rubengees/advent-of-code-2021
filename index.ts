import { Command } from "commander"
import { PathLike } from "fs"
import { readInput } from "./utils"

type Program = (input: string[]) => number

new Command()
  .version("1.0.0", "-v, --version")
  .name("Advent of Code 2021")
  .argument("<day>", "the day to run. Part 1 is assumed if .2 is not appended")
  .argument("[file]", "a file path with the input")
  .action(async (day: string, file?: PathLike) => {
    let dayProgram: Program
    let input: string[]

    try {
      dayProgram = (await import("./day" + day)).default as Program
    } catch (e) {
      console.error(`Did not find program for day ${day}`)
      return
    }

    try {
      input = readInput(file || process.stdin.fd)
    } catch {
      console.error(`Could not read input from ${file || "stdin"}`)
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
