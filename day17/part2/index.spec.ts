import { readInput } from "../../utils"
import day17_part2 from "./index"

describe("day 17 part 2", () => {
  test("example", () => {
    const example = ["target area: x=20..30, y=-10..-5"]

    const result = day17_part2(example)

    expect(result).toEqual(112)
  })

  test("input", async () => {
    const input = await readInput("day17/input.txt")
    const result = day17_part2(input)

    expect(result).toEqual(5059)
  })
})
