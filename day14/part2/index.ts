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

// Produce a map of each pair with its count.
function parseTemplate(template: string): Map<string, number> {
  const result = new Map<string, number>()

  for (let i = 1; i < template.length; i++) {
    const pair = template[i - 1] + template[i]

    result.set(pair, (result.get(pair) ?? 0) + 1)
  }

  return result
}

// Simulate a step by expanding each pair to the next two pairs.
function step(template: Map<string, number>, mappings: { [key: string]: string[] }): Map<string, number> {
  const result = new Map<string, number>()

  for (const [pair, count] of template.entries()) {
    for (const mappedPair of mappings[pair]) {
      result.set(mappedPair, (result.get(mappedPair) ?? 0) + count)
    }
  }

  return result
}

// Count chars by taking the second char in each pair. This produces an off-by-one error for the first char,
// thus the first char has to be passed to correct the result.
function countChars(template: Map<string, number>, startChar: string): Map<string, number> {
  const result = new Map<string, number>()

  for (const [[, rightChar], count] of template) {
    result.set(rightChar, (result.get(rightChar) ?? 0) + count)
  }

  result.set(startChar, (result.get(startChar) ?? 0) + 1)

  return result
}

export default function day14_part2(input: string[]): number {
  const template = parseTemplate(input[0])

  const mappings = Object.fromEntries(
    input
      .slice(2)
      .map((it) => it.split(" -> "))
      .map(([[firstLeft, lastLeft], right]) => [firstLeft + lastLeft, [firstLeft + right, right + lastLeft]])
  )

  const result = Array.from(Array<Map<string, number>>(40)).reduce(
    (previousValue) => step(previousValue, mappings),
    template
  )

  const charCount = countChars(result, input[0][0])
  const [, maxCount] = maxBy(Array.from(charCount.entries()), ([, count]) => count)
  const [, minCount] = minBy(Array.from(charCount.entries()), ([, count]) => count)

  return maxCount - minCount
}
