type BoardCell = {
  value: string
  marked: boolean
}

export class Board {
  private readonly matrix: BoardCell[][]

  constructor(lines: string[]) {
    this.matrix = []

    for (const line of lines) {
      this.matrix.push(
        line
          .split(" ")
          .filter((it) => it)
          .map((it) => ({ value: it, marked: false }))
      )
    }
  }

  mark(draw: string) {
    for (const row of this.matrix) {
      for (const cell of row) {
        if (cell.value === draw) {
          cell.marked = true
        }
      }
    }
  }

  get hasWon(): boolean {
    // Check rows.
    if (this.matrix.some((row) => row.every((cell) => cell.marked))) {
      return true
    }

    // Check columns.
    if (
      this.matrix[0].some((_, columnIndex) => {
        const columns = this.matrix.map((row) => row[columnIndex])

        return columns.every((cell) => cell.marked)
      })
    ) {
      return true
    }

    // Nothing found.
    return false
  }

  get unmarkedSum(): number {
    return this.matrix.reduce(
      (prevRow, currRow) =>
        prevRow +
        currRow.filter((it) => !it.marked).reduce((prevCell, currCell) => prevCell + parseInt(currCell.value), 0),
      0
    )
  }
}

// Generates arrays of lines delimited by empty lines.
function* chunkLines(lines: string[]): Generator<string[]> {
  let last = 0

  for (let i = 0; i < lines.length; i++) {
    if (lines[i] === "") {
      yield lines.slice(last, i)

      last = i + 1
    }
  }

  yield lines.slice(last, lines.length)
}

function eliminateBoards(boards: Board[], remainingDraws: string[]): [Board, string] {
  for (const board of boards) {
    board.mark(remainingDraws[0])
  }

  const remainingBoards = boards.filter((it) => !it.hasWon)

  if (remainingBoards.length === 0) {
    return [boards[0], remainingDraws[0]]
  } else {
    return eliminateBoards(remainingBoards, remainingDraws.slice(1))
  }
}

export default function day4_part2(input: string[]): number {
  const chunked: string[][] = [...chunkLines(input)]

  const drawnValues = chunked[0].flatMap((it) => it.split(","))
  const boards = chunked.slice(1).map((it) => new Board(it))

  const [lastBoardToWin, lastDraw] = eliminateBoards(boards, drawnValues)

  return lastBoardToWin.unmarkedSum * parseInt(lastDraw)
}
