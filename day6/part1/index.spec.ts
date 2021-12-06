import { readInput } from "../../utils"
import day6_part1 from "./index"

describe("day 6 part 1", () => {
  test("example", () => {
    const example = ["3,4,3,1,2"]
    const result = day6_part1(example)

    expect(result).toEqual(5934)
  })

  test("input", () => {
    const input = readInput("day6/input.txt")
    const result = day6_part1(input)

    expect(result).toEqual(362740)
  })
})
