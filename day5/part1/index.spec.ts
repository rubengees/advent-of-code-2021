import { readInput } from "../../utils"
import day5_part1 from "./index"

describe("day 5 part 1", () => {
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

    const result = day5_part1(example)

    expect(result).toEqual(5)
  })

  test("input", async () => {
    const input = await readInput("day5/input.txt")
    const result = day5_part1(input)

    expect(result).toEqual(6007)
  })
})
