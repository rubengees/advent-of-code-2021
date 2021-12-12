import { readInput } from "../../utils"
import day11_part1 from "./index"

describe("day 11 part 1", () => {
  test("example", () => {
    const example = [
      "5483143223",
      "2745854711",
      "5264556173",
      "6141336146",
      "6357385478",
      "4167524645",
      "2176841721",
      "6882881134",
      "4846848554",
      "5283751526",
    ]

    const result = day11_part1(example)

    expect(result).toEqual(1656)
  })

  test("input", async () => {
    const input = await readInput("day11/input.txt")
    const result = day11_part1(input)

    expect(result).toEqual(1675)
  })
})
