import { readInput } from "../../utils"
import day13_part1 from "./index"

describe("day 13 part 1", () => {
  test("example", () => {
    const example = [
      "6,10",
      "0,14",
      "9,10",
      "0,3",
      "10,4",
      "4,11",
      "6,0",
      "6,12",
      "4,1",
      "0,13",
      "10,12",
      "3,4",
      "3,0",
      "8,4",
      "1,10",
      "2,14",
      "8,10",
      "9,0",
      "",
      "fold along y=7",
      "fold along x=5",
    ]

    const result = day13_part1(example)

    expect(result).toEqual(17)
  })

  test("input", async () => {
    const input = await readInput("day13/input.txt")
    const result = day13_part1(input)

    expect(result).toEqual(814)
  })
})
