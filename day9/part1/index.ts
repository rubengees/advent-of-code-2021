export default function day9_part1(input: string[]): number {
  const matrix: number[][] = []

  for (const row of input) {
    matrix.push(row.split("").map((it) => parseInt(it)))
  }

  const result: number[] = []

  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      const number = matrix[row][col]

      if (row > 0 && matrix[row - 1][col] <= number) {
        continue
      } else if (row < matrix.length - 1 && matrix[row + 1][col] <= number) {
        continue
      } else if (col > 0 && matrix[row][col - 1] <= number) {
        continue
      } else if (col < matrix[row].length - 1 && matrix[row][col + 1] <= number) {
        continue
      }

      result.push(number + 1)
    }
  }

  return result.reduce((prev, curr) => prev + curr, 0)
}
