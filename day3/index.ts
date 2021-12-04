function maxBy<T, E>(values: T[], extract: (value: T) => E): T {
  return values.reduce((prev: T, curr: T) => {
    return extract(prev) > extract(curr) ? prev : curr
  })
}

function findMostCommon(values: string[]): string {
  const map = new Map<string, number>()

  for (const value of values) {
    map.set(value, (map.get(value) ?? 0) + 1)
  }

  const [value] = maxBy(Array.from(map.entries()), ([, amount]) => amount)

  return value
}

export default function day3(input: string[]): number {
  const matrix: string[][] = input.map((it) => it.split(""))

  // Simple, but not performant transpose.
  const columns = matrix[0].map((_, index) => matrix.map((row) => row[index]))
  const mostCommonValues = columns.map((it) => findMostCommon(it))

  const gammaString = mostCommonValues.join("")
  const gamma = parseInt(gammaString, 2)
  const epsilon = ~gamma & (Math.pow(2, gammaString.length) - 1) // Invert binary gamma.

  return gamma * epsilon
}
