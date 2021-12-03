import { readInput } from "../utils"
import day2_1 from "./index"

describe("day 2.1", () => {
  test("example", () => {
    const example = ["forward 5", "down 5", "forward 8", "up 3", "down 8", "forward 2"]
    const result = day2_1(example)

    expect(result).toEqual(900)
  })

  test("input", () => {
    const input = readInput("day2/input.txt")
    const result = day2_1(input)

    expect(result).toEqual(1971095320)
  })
})
