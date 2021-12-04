import { readInput } from "../utils"
import day3_1 from "./index"

describe("day 3.1", () => {
  test("example", () => {
    const example = [
      "00100",
      "11110",
      "10110",
      "10111",
      "10101",
      "01111",
      "00111",
      "11100",
      "10000",
      "11001",
      "00010",
      "01010",
    ]

    const result = day3_1(example)

    expect(result).toEqual(230)
  })

  test("input", () => {
    const input = readInput("day3.1/input.txt")
    const result = day3_1(input)

    expect(result).toEqual(3969126)
  })
})
