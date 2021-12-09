import { readInput } from "../../utils"
import day9_part1 from "./index"

describe("day 9 part 1", () => {
  test("example", () => {
    const example = ["2199943210", "3987894921", "9856789892", "8767896789", "9899965678"]

    const result = day9_part1(example)

    expect(result).toEqual(15)
  })

  test("input", async () => {
    const input = await readInput("day9/input.txt")
    const result = day9_part1(input)

    expect(result).toEqual(570)
  })
})
