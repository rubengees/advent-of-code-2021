import { readInput } from "../../utils"
import day6_part2 from "./index"

describe("day 6 part 2", () => {
  test("example", () => {
    const example = ["3,4,3,1,2"]
    const result = day6_part2(example)

    expect(result).toEqual(26984457539)
  })

  test("input", async () => {
    const input = await readInput("day6/input.txt")
    const result = day6_part2(input)

    expect(result).toEqual(1644874076764)
  })
})
