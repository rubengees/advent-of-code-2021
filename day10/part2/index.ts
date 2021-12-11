const charMapping: { [key: string]: string } = {
  "(": ")",
  "[": "]",
  "{": "}",
  "<": ">",
}

const valueMapping: { [key: string]: number } = {
  "(": 1,
  "[": 2,
  "{": 3,
  "<": 4,
}

function isOpeningChar(char: string): boolean {
  return Object.keys(charMapping).includes(char)
}

function isClosingChar(char: string): boolean {
  return Object.values(charMapping).includes(char)
}

// Returns -1 for corrupted lines. Otherwise, the score for completing the line.
function checkLine(line: string) {
  const queue: string[] = []

  for (const char of line.split("")) {
    if (isOpeningChar(char)) {
      queue.push(char)
    } else if (isClosingChar(char)) {
      const previous = queue[queue.length - 1]

      if (charMapping[previous] === char) {
        queue.splice(queue.length - 1, 1)
      } else {
        return -1
      }
    } else {
      throw new Error(`Invalid char: ${char}`)
    }
  }

  return queue.reverse().reduce((previousValue, currentValue) => previousValue * 5 + valueMapping[currentValue], 0)
}

export default function day10_part2(input: string[]): number {
  const lineScores = input
    .map((it) => checkLine(it))
    .filter((it) => it >= 0)
    .sort((a, b) => a - b)

  return lineScores[Math.floor(lineScores.length / 2)]
}
