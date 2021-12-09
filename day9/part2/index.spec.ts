import { readInput } from "../../utils"
import day9_part2 from "./index"

describe("day 9 part 2", () => {
  test("example", () => {
    const example = ["2199943210", "3987894921", "9856789892", "8767896789", "9899965678"]

    const result = day9_part2(example)

    expect(result).toEqual(1134)
  })

  test("input", async () => {
    const input = await readInput("day9/input.txt")
    const result = day9_part2(input)

    expect(result).toEqual(899392)
  })
})
