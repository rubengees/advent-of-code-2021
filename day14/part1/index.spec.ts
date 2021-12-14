import { readInput } from "../../utils"
import day14_part1 from "./index"

describe("day 14 part 1", () => {
  test("example", () => {
    const example = [
      "NNCB",
      "",
      "CH -> B",
      "HH -> N",
      "CB -> H",
      "NH -> C",
      "HB -> C",
      "HC -> B",
      "HN -> C",
      "NN -> C",
      "BH -> H",
      "NC -> B",
      "NB -> B",
      "BN -> B",
      "BB -> N",
      "BC -> B",
      "CC -> N",
      "CN -> C",
    ]

    const result = day14_part1(example)

    expect(result).toEqual(1588)
  })

  test("input", async () => {
    const input = await readInput("day14/input.txt")
    const result = day14_part1(input)

    expect(result).toEqual(2194)
  })
})
