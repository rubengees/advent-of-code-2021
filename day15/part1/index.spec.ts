import { readInput } from "../../utils"
import day15_part1 from "./index"

describe("day 15 part 1", () => {
  test("example", () => {
    const example = [
      "1163751742",
      "1381373672",
      "2136511328",
      "3694931569",
      "7463417111",
      "1319128137",
      "1359912421",
      "3125421639",
      "1293138521",
      "2311944581",
    ]

    const result = day15_part1(example)

    expect(result).toEqual(40)
  })

  test("input", async () => {
    const input = await readInput("day15/input.txt")
    const result = day15_part1(input)

    expect(result).toEqual(696)
  })
})
