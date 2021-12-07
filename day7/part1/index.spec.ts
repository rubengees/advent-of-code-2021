import { readInput } from "../../utils"
import day7_part1 from "./index"

describe("day 7 part 1", () => {
  test("example", () => {
    const example = ["16,1,2,0,4,2,7,1,2,14"]
    const result = day7_part1(example)

    expect(result).toEqual(37)
  })

  test("input", async () => {
    const input = await readInput("day7/input.txt")
    const result = day7_part1(input)

    expect(result).toEqual(342534)
  })
})
