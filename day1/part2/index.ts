// Calculates the sum of all windows with the given size in the given array.
function windowSum(array: string[], size: number): number[] {
  if (array.length <= size) {
    return []
  }

  const result: number[] = []

  for (let i = size - 1; i < array.length; i++) {
    result.push(
      array
        .slice(i - (size - 1), i + 1)
        .map((it) => parseInt(it))
        .reduce((prev, cur) => prev + cur, 0)
    )
  }

  return result
}

export default function day1_part2(input: string[]): number {
  let previous = Number.MAX_VALUE
  let count = 0

  for (const part of windowSum(input, 3)) {
    const partNumber = part

    if (partNumber > previous) {
      count++
    }

    previous = partNumber
  }

  return count
}
