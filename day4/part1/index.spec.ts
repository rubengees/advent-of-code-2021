import { readInput } from "../../utils"
import day4_part1, { Board } from "./index"

describe("day 4 part 1", () => {
  test("board has won row", () => {
    const board = new Board(["22 13 17 11  0", " 8  2 23  4 24", "21  9 14 16  7", " 6 10  3 18  5", " 1 12 20 15 19"])

    board.mark("21")
    board.mark("9")
    board.mark("14")
    board.mark("16")
    board.mark("7")

    expect(board.hasWon).toBeTruthy()
  })

  test("board has won column", () => {
    const board = new Board(["22 13 17 11  0", " 8  2 23  4 24", "21  9 14 16  7", " 6 10  3 18  5", " 1 12 20 15 19"])

    board.mark("13")
    board.mark("2")
    board.mark("9")
    board.mark("10")
    board.mark("12")

    expect(board.hasWon).toBeTruthy()
  })

  test("board has not won", () => {
    const board = new Board(["22 13 17 11  0", " 8  2 23  4 24", "21  9 14 16  7", " 6 10  3 18  5", " 1 12 20 15 19"])

    board.mark("13")
    board.mark("2")
    board.mark("9")
    board.mark("10")
    board.mark("19")

    expect(board.hasWon).toBeFalsy()
  })

  test("example", () => {
    const example = [
      "7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1",
      "",
      "22 13 17 11  0",
      " 8  2 23  4 24",
      "21  9 14 16  7",
      " 6 10  3 18  5",
      " 1 12 20 15 19",
      "",
      " 3 15  0  2 22",
      " 9 18 13 17  5",
      "19  8  7 25 23",
      "20 11 10 24  4",
      "14 21 16 12  6",
      "",
      "14 21 17 24  4",
      "10 16 15  9 19",
      "18  8 23 26 20",
      "22 11 13  6  5",
      " 2  0 12  3  7",
    ]

    const result = day4_part1(example)

    expect(result).toEqual(4512)
  })

  test("input", async () => {
    const input = await readInput("day4/input.txt")
    const result = day4_part1(input)

    expect(result).toEqual(58412)
  })
})
