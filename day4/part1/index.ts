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

export default function day4_part1(input: string[]): number {
  const chunked: string[][] = [...chunkLines(input)]

  const drawnValues = chunked[0].flatMap((it) => it.split(","))
  const boards = chunked.slice(1).map((it) => new Board(it))

  for (const draw of drawnValues) {
    for (const board of boards) {
      board.mark(draw)

      if (board.hasWon) {
        return board.unmarkedSum * parseInt(draw)
      }
    }
  }

  return 0
}
