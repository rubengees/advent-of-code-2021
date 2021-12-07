import { readInput } from "../../utils"
import day3_part1 from "./index"

describe("day 3 part 1", () => {
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

    const result = day3_part1(example)

    expect(result).toEqual(198)
  })

  test("input", async () => {
    const input = await readInput("day3/input.txt")
    const result = day3_part1(input)

    expect(result).toEqual(738234)
  })
})
