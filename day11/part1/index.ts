type Point = { row: number; col: number }

function iterate(matrix: number[][], iterator: (value: number, row: number, col: number) => void) {
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      iterator(matrix[row][col], row, col)
    }
  }
}

function findNeighbours(matrix: number[][], row: number, col: number): Point[] {
  return [
    { row: row - 1, col: col - 1 },
    { row: row - 1, col: col },
    { row: row - 1, col: col + 1 },
    { row: row, col: col - 1 },
    { row: row, col: col + 1 },
    { row: row + 1, col: col - 1 },
    { row: row + 1, col: col },
    { row: row + 1, col: col + 1 },
  ].filter(({ row, col }) => matrix[row]?.[col] !== undefined)
}

// Simulates a single step. Modifies the matrix in place and returns the amount of flashes.
function step(matrix: number[][]): number {
  // Increase all cells by one.
  iterate(matrix, (_, row, col) => {
    matrix[row][col] += 1
  })

  // Iterate matrix and apply flashes to every cell's neighbours.
  const flashMap = new Map<string, boolean>()
  let newFlash = true

  while (newFlash) {
    newFlash = false

    iterate(matrix, (value, row, col) => {
      if (value > 9 && !flashMap.get(`${row}-${col}`)) {
        for (const { row: neighbourRow, col: neighbourCol } of findNeighbours(matrix, row, col)) {
          matrix[neighbourRow][neighbourCol] += 1
        }

        newFlash = true
        flashMap.set(`${row}-${col}`, true)
      }
    })
  }

  // Set all flashed cells to 0.
  iterate(matrix, (value, row, col) => {
    if (value > 9) {
      matrix[row][col] = 0
    }
  })

  return flashMap.size
}

export default function day11_part1(input: string[]): number {
  const matrix: number[][] = []

  for (const row of input) {
    matrix.push(row.split("").map((it) => parseInt(it)))
  }

  let flashes = 0
  for (let i = 0; i < 100; i++) {
    flashes += step(matrix)
  }

  return flashes
}
