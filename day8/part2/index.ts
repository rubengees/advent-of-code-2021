export type Line = {
  examples: string[]
  digits: string[]
}

type TranslationTable = {
  [key: string]: string
}

const charsToDigits: { [key: string]: number } = {
  abcefg: 0,
  cf: 1,
  acdeg: 2,
  acdfg: 3,
  bcdf: 4,
  abdfg: 5,
  abdefg: 6,
  acf: 7,
  abcdefg: 8,
  abcdfg: 9,
}

function removeAllCharsFromString(value: string, other: string): string {
  return other.split("").reduce((prev, curr) => prev.replace(curr, ""), value)
}

function findOrError<T>(values: T[], filter: (value: T) => boolean): T {
  const result = values.find(filter)

  if (result === undefined) {
    throw new TypeError("Invalid input")
  }

  return result
}

// Apply manually constructed algorithm to the line (see comments for each step) and return a translation table.
// There is probably a cool constraint solving way to do this which I have not found yet.
function findTranslation(line: Line): TranslationTable {
  const examplesByLength = {
    two: findOrError(line.examples, (it) => it.length == 2),
    three: findOrError(line.examples, (it) => it.length == 3),
    four: findOrError(line.examples, (it) => it.length == 4),
    six: line.examples.filter((it) => it.length == 6),
  }

  // Start with empty translation table.
  const translation: TranslationTable = { a: "", b: "", c: "", d: "", e: "", f: "", g: "" }

  // Step 1: Find char from two long number. These are either "c" or "f".
  const ab = examplesByLength.two

  // Step 2: Find char which is not "c" or "f" from before, It is "a".
  translation.a = findOrError(examplesByLength.three.split(""), (it) => !ab.includes(it))

  // Step 3: Find six long number that is missing one of "c" or "f". The missing is "c", the other is "f".
  translation.c = findOrError(ab.split(""), (it) => !examplesByLength.six.every((example) => example.includes(it)))
  translation.f = ab.replace(translation.c, "")

  // Step 4: Find chars from four long number that are not "c" or "f". These are "b" or "d".
  const bd = examplesByLength.four.replace(translation.c, "").replace(translation.f, "")

  // Step 3: Find six long number that is missing one of "b" or "d". The missing char is "d", the other is "b".
  translation.d = findOrError(bd.split(""), (it) => !examplesByLength.six.every((example) => example.includes(it)))
  translation.b = bd.replace(translation.d, "")

  // Step 6: Find six long number including "a", "c", "b", "d" and "f" (number 9). The remaining char is "g".
  translation.g = findOrError(
    examplesByLength.six.map((it) => removeAllCharsFromString(it, Object.values(translation).join(""))),
    (it) => it.length === 1
  )

  // Step 7: The last unknown char is "e".
  translation.e = removeAllCharsFromString("abcdefg", Object.values(translation).join(""))

  // Reverse translation table (key <=> value).
  return Object.fromEntries(Object.entries(translation).map(([left, right]) => [right, left]))
}

export function solve(line: Line): number {
  const translation = findTranslation(line)

  const translatedDigits = line.digits
    .map((chars) =>
      chars
        .split("")
        .map((char) => translation[char])
        .sort()
        .join("")
    )
    .map((it) => charsToDigits[it])
    .join("")

  return parseInt(translatedDigits)
}

export default function day8_part2(input: string[]): number {
  const lines: Line[] = input.map((it) => {
    const [left, right] = it.split(" | ")

    return { examples: left.split(" "), digits: right.split(" ") }
  })

  return lines.reduce((prev, curr) => prev + solve(curr), 0)
}
