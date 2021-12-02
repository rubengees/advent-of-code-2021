export default function day1(input: string[]): number {
  let previous = Number.MAX_VALUE
  let count = 0

  for (const part of input) {
    const partNumber = parseInt(part)

    if (partNumber > previous) {
      count++
    }

    previous = partNumber
  }

  return count
}
