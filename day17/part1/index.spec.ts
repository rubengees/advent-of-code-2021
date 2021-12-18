import { readInput } from "../../utils"
import day17_part1 from "./index"

describe("day 17 part 1", () => {
  test("example", () => {
    const example = ["target area: x=20..30, y=-10..-5"]

    const result = day17_part1(example)

    expect(result).toEqual(45)
  })

  test("input", async () => {
    const input = await readInput("day17/input.txt")
    const result = day17_part1(input)

    expect(result).toEqual(12090)
  })
})
