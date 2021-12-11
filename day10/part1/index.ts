const charMapping: { [key: string]: string } = {
  "(": ")",
  "[": "]",
  "{": "}",
  "<": ">",
}

const valueMapping: { [key: string]: number } = {
  ")": 3,
  "]": 57,
  "}": 1197,
  ">": 25137,
}

function isOpeningChar(char: string): boolean {
  return Object.keys(charMapping).includes(char)
}

function isClosingChar(char: string): boolean {
  return Object.values(charMapping).includes(char)
}

function checkLine(line: string): number {
  const queue: string[] = []

  for (const char of line.split("")) {
    if (isOpeningChar(char)) {
      queue.push(char)
    } else if (isClosingChar(char)) {
      const previous = queue[queue.length - 1]

      if (charMapping[previous] === char) {
        queue.splice(queue.length - 1, 1)
      } else {
        return valueMapping[char]
      }
    } else {
      throw new Error(`Invalid char: ${char}`)
    }
  }

  return 0
}

export default function day10_part1(input: string[]): number {
  return input.reduce((prev, curr) => prev + checkLine(curr), 0)
}
