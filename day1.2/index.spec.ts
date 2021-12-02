import { readInput } from "../utils"
import day1_2 from "./index"

describe("day 1.2", () => {
  test("example", () => {
    const example = ["199", "200", "208", "210", "200", "207", "240", "269", "260", "263"]
    const result = day1_2(example)

    expect(result).toEqual(5)
  })

  test("input", () => {
    const input = readInput("day1.2/input.txt")
    const result = day1_2(input)

    expect(result).toEqual(1346)
  })
})
