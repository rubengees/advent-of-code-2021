function maxBy<T, E>(values: T[], extract: (value: T) => E): T {
  return values.reduce((prev: T, curr: T) => {
    return extract(prev) > extract(curr) ? prev : curr
  })
}

function minBy<T, E>(values: T[], extract: (value: T) => E): T {
  return values.reduce((prev: T, curr: T) => {
    return extract(prev) < extract(curr) ? prev : curr
  })
}

function countChars(value: string): Map<string, number> {
  const result = new Map<string, number>()

  for (const char of value.split("")) {
    result.set(char, (result.get(char) ?? 0) + 1)
  }

  return result
}

function step(template: string, mappings: { [key: string]: string }): string {
  let result = ""

  for (let i = 1; i < template.length; i++) {
    result += template[i - 1]
    result += mappings[template[i - 1] + template[i]]
  }

  result += template[template.length - 1]

  return result
}

export default function day14_part1(input: string[]): number {
  const template = input[0]

  const mappings = Object.fromEntries(
    input
      .slice(2)
      .map((it) => it.split(" -> "))
      .map(([left, right]) => [left, right])
  )

  const result = Array.from(Array<string>(10)).reduce((previousValue) => step(previousValue, mappings), template)

  const charCount = countChars(result)
  const [, maxCount] = maxBy(Array.from(charCount.entries()), ([, count]) => count)
  const [, minCount] = minBy(Array.from(charCount.entries()), ([, count]) => count)

  return maxCount - minCount
}
