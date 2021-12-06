export default function day6_part2(input: string[]): number {
  const numbers = input[0].split(",").map((it) => parseInt(it))

  const map = new Map<number, number>()

  for (const number of numbers) {
    map.set(number, (map.get(number) ?? 0) + 1)
  }

  for (let i = 0; i < 256; i++) {
    const nextGenerationAmount = map.get(0) ?? 0

    for (let j = 1; j <= 8; j++) {
      map.set(j - 1, map.get(j) ?? 0)
    }

    map.set(8, nextGenerationAmount)
    map.set(6, (map.get(6) ?? 0) + nextGenerationAmount)
  }

  return Array.from(map.values()).reduce((prev, curr) => prev + curr, 0)
}
