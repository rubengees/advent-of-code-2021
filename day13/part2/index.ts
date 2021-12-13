type Instruction = {
  horizontal: boolean
  position: number
}

function splitLines(input: string[]): string[][] {
  const index = input.findIndex((it) => it === "")

  return [input.slice(0, index), input.slice(index + 1, input.length)]
}

function parseMatrix(points: string[]): boolean[][] {
  const parsedPoints: [number, number][] = points.map((it) => it.split(",")).map(([x, y]) => [parseInt(x), parseInt(y)])
  const width = Math.max(...parsedPoints.map(([row]) => row)) + 1
  const height = Math.max(...parsedPoints.map(([, col]) => col)) + 1

  const result = Array.from({ length: width }, () => Array.from({ length: height }, () => false))

  for (const [row, col] of parsedPoints) {
    result[row][col] = true
  }

  return result
}

function parseInstruction(raw: string): Instruction {
  const match = raw.match(/fold along ([xy])=(\d+)/)

  if (!match) {
    throw new Error(`Invalid instruction: ${raw}`)
  }

  const [, direction, position] = match

  return { horizontal: direction === "x", position: parseInt(position) }
}

function transposeMatrix<T>(matrix: T[][]): T[][] {
  return matrix[0].map((x, i) => matrix.map((x) => x[i]))
}

export function applyInstruction(matrix: boolean[][], instruction: Instruction): boolean[][] {
  if (instruction.horizontal) {
    const rowsToFold = matrix.slice(instruction.position + 1).reverse()

    for (let row = 0; row < rowsToFold.length; row++) {
      for (let col = 0; col < rowsToFold[row].length; col++) {
        matrix[row][col] = matrix[row][col] || rowsToFold[row][col]
      }
    }

    matrix.splice(instruction.position, matrix.length - instruction.position)
  } else {
    matrix = transposeMatrix(applyInstruction(transposeMatrix(matrix), { ...instruction, horizontal: true }))
  }

  return matrix
}

/* eslint-disable @typescript-eslint/no-unused-vars */
// noinspection JSUnusedLocalSymbols
function convertToImage(matrix: boolean[][]): string {
  return transposeMatrix(matrix).reduce(
    (result, row) => row.reduce((result, currentValue) => result + (currentValue ? "#" : "."), ""),
    ""
  )
}
/* eslint-enable @typescript-eslint/no-unused-vars */

export default function day13_part2(input: string[]): number {
  const [points, rawInstructions] = splitLines(input)

  const matrix = parseMatrix(points)
  const instructions = rawInstructions.map((it) => parseInstruction(it))

  const result = instructions.reduce(
    (previousValue, currentValue) => applyInstruction(previousValue, currentValue),
    matrix
  )

  // This part wants us to print the result to the console and manually read the pattern.
  // This is hard to test, so we return the same as part 1.
  //
  // Comment this line in if you want to see the pattern:
  //
  // console.log(convertToImage(result))

  return result.reduce((sum, row) => sum + row.reduce((sum, cell) => sum + (cell ? 1 : 0), 0), 0)
}
