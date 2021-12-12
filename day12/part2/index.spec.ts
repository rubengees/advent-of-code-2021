import { readInput } from "../../utils"
import day12_part2 from "./index"

describe("day 12 part 2", () => {
  test("example", () => {
    const example = ["start-A", "start-b", "A-c", "A-b", "b-d", "A-end", "b-end"]

    const result = day12_part2(example)

    expect(result).toEqual(36)
  })

  test("example 2", () => {
    const example = [
      "dc-end",
      "HN-start",
      "start-kj",
      "dc-start",
      "dc-HN",
      "LN-dc",
      "HN-end",
      "kj-sa",
      "kj-HN",
      "kj-dc",
    ]

    const result = day12_part2(example)

    expect(result).toEqual(103)
  })

  test("example 3", () => {
    const example = [
      "fs-end",
      "he-DX",
      "fs-he",
      "start-DX",
      "pj-DX",
      "end-zg",
      "zg-sl",
      "zg-pj",
      "pj-he",
      "RW-he",
      "fs-DX",
      "pj-RW",
      "zg-RW",
      "start-pj",
      "he-WI",
      "zg-he",
      "pj-fs",
      "start-RW",
    ]

    const result = day12_part2(example)

    expect(result).toEqual(3509)
  })

  test("input", async () => {
    const input = await readInput("day12/input.txt")
    const result = day12_part2(input)

    expect(result).toEqual(122880)
  })
})
