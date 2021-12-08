type Line = {
  examples: string[]
  digits: string[]
}

function isUniqueCombination(value: string): boolean {
  return [2, 3, 4, 7].includes(value.length)
}

export default function day8_part1(input: string[]): number {
  const lines: Line[] = input.map((it) => {
    const [left, right] = it.split(" | ")

    return { examples: left.split(" "), digits: right.split(" ") }
  })

  return lines.flatMap((it) => it.digits).filter((it) => isUniqueCombination(it)).length
}
