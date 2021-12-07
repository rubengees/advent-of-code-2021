// https://en.wikipedia.org/wiki/1_%2B_2_%2B_3_%2B_4_%2B_%E2%8B%AF
function partialSum(to: number): number {
  return (to * (to + 1)) / 2
}

export default function day7_part2(input: string[]): number {
  const positions = input[0].split(",").map((it) => parseInt(it))
  const min = Math.min(...positions)
  const max = Math.max(...positions)

  let smallestFuelUsage = Number.MAX_VALUE

  for (let i = min; i <= max; i++) {
    const fuelUsageForI = positions.reduce(
      (previousValue, currentValue) => previousValue + partialSum(Math.abs(currentValue - i)),
      0
    )

    smallestFuelUsage = Math.min(smallestFuelUsage, fuelUsageForI)
  }

  return smallestFuelUsage
}
