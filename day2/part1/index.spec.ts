import { readInput } from "../../utils"
import day2_part1 from "./index"

describe("day 2 part 1", () => {
  test("example", () => {
    const example = ["forward 5", "down 5", "forward 8", "up 3", "down 8", "forward 2"]
    const result = day2_part1(example)

    expect(result).toEqual(150)
  })

  test("input", async () => {
    const input = await readInput("day2/input.txt")
    const result = day2_part1(input)

    expect(result).toEqual(1804520)
  })
})
