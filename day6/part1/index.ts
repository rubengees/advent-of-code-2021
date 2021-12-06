export default function day6_part1(input: string[]): number {
  const numbers = input[0].split(",").map((it) => parseInt(it))

  for (let i = 0; i < 80; i++) {
    const newNumbers: number[] = []

    for (let j = 0; j < numbers.length; j++) {
      if (numbers[j] === 0) {
        newNumbers.push(8)

        numbers[j] = 6
      } else {
        numbers[j] -= 1
      }
    }

    numbers.push(...newNumbers)
  }

  return numbers.length
}
