type Point = {
  row: number
  col: number
}

function pointsEqual(a: Point, b: Point): boolean {
  return a.row === b.row && a.col === b.col
}

function notUndefined<T>(value: T | undefined): value is T {
  return value !== undefined
}

function findNeighbours(matrix: number[][], point: Point): Point[] {
  const { row, col } = point

  return [
    { row: row - 1, col },
    { row: row + 1, col },
    { row, col: col - 1 },
    { row, col: col + 1 },
  ].filter(({ row, col }) => notUndefined(matrix[row]?.[col]))
}

function findLowPoints(matrix: number[][]): Point[] {
  const result: Point[] = []

  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      const neighbours = findNeighbours(matrix, { row, col }).map(({ row, col }) => matrix[row][col])
      const number = matrix[row][col]

      if (neighbours.every((neighbour) => neighbour > number)) {
        result.push({ row, col })
      }
    }
  }

  return result
}

function calculateBasinSize(matrix: number[][], point: Point): number {
  const result = [point]
  const queue = [point]

  while (queue.length > 0) {
    const neighbours = findNeighbours(matrix, queue[0])

    neighbours
      .filter(({ row, col }) => matrix[row][col] < 9)
      .filter((it) => !result.some((existing) => pointsEqual(it, existing)))
      .forEach((it) => {
        result.push(it)
        queue.push(it)
      })

    queue.splice(0, 1)
  }

  return result.length
}

export default function day9_part2(input: string[]): number {
  const matrix: number[][] = []

  for (const row of input) {
    matrix.push(row.split("").map((it) => parseInt(it)))
  }

  const lowPoints = findLowPoints(matrix)
  const basinSizes = lowPoints.map((it) => calculateBasinSize(matrix, it))

  return basinSizes
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((prev, curr) => prev * curr, 1)
}
