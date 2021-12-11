import { readInput } from "../../utils"
import day10_part1 from "./index"

describe("day 10 part 1", () => {
  test("example", () => {
    const example = [
      "[({(<(())[]>[[{[]{<()<>>",
      "[(()[<>])]({[<{<<[]>>(",
      "{([(<{}[<>[]}>{[]{[(<()>",
      "(((({<>}<{<{<>}{[]{[]{}",
      "[[<[([]))<([[{}[[()]]]",
      "[{[{({}]{}}([{[{{{}}([]",
      "{<[[]]>}<{[{[{[]{()[[[]",
      "[<(<(<(<{}))><([]([]()",
      "<{([([[(<>()){}]>(<<{{",
      "<{([{{}}[<[[[<>{}]]]>[]]",
    ]

    const result = day10_part1(example)

    expect(result).toEqual(26397)
  })

  test("input", async () => {
    const input = await readInput("day10/input.txt")
    const result = day10_part1(input)

    expect(result).toEqual(318099)
  })
})
