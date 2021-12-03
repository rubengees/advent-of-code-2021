import { readInput } from "../utils"
import day3 from "./index"

describe("day 3", () => {
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

    const result = day3(example)

    expect(result).toEqual(198)
  })

  test("input", () => {
    const input = readInput("day3/input.txt")
    const result = day3(input)

    expect(result).toEqual(738234)
  })
})
