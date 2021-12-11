import { readInput } from "../../utils"
import day10_part2 from "./index"

describe("day 10 part 2", () => {
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

    const result = day10_part2(example)

    expect(result).toEqual(288957)
  })

  test("input", async () => {
    const input = await readInput("day10/input.txt")
    const result = day10_part2(input)

    expect(result).toEqual(2389738699)
  })
})
