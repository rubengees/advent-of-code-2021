type CharCount = {
  [char: string]: number
}

function countChars(values: string[]): CharCount {
  const map = new Map<string, number>()

  for (const value of values) {
    map.set(value, (map.get(value) ?? 0) + 1)
  }

  return Object.fromEntries(Array.from(map.entries()))
}

function findRating(input: string[], extractor: (count: CharCount) => string, position: number = 0): string {
  const count = countChars(input.map((it) => it.charAt(position)))
  const charToFilterBy = extractor(count)

  const filteredInput = input.filter((it) => it.charAt(position) === charToFilterBy)

  if (filteredInput.length === 1) {
    return filteredInput[0]
  }

  return findRating(filteredInput, extractor, position + 1)
}

export default function day3(input: string[]): number {
  const oxygen = findRating(input, (count) => (count["0"] > count["1"] ? "0" : "1"))
  const co2 = findRating(input, (count) => (count["1"] < count["0"] ? "1" : "0"))

  return parseInt(oxygen, 2) * parseInt(co2, 2)
}
