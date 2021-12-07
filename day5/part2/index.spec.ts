import { readInput } from "../../utils"
import day5_part2 from "./index"

describe("day 5 part 2", () => {
  test("example", () => {
    const example = [
      "0,9 -> 5,9",
      "8,0 -> 0,8",
      "9,4 -> 3,4",
      "2,2 -> 2,1",
      "7,0 -> 7,4",
      "6,4 -> 2,0",
      "0,9 -> 2,9",
      "3,4 -> 1,4",
      "0,0 -> 8,8",
      "5,5 -> 8,2",
    ]

    const result = day5_part2(example)

    expect(result).toEqual(12)
  })

  test("input", async () => {
    const input = await readInput("day5/input.txt")
    const result = day5_part2(input)

    expect(result).toEqual(19349)
  })
})
