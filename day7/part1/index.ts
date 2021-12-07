export default function day7_part1(input: string[]): number {
  const positions = input[0].split(",").map((it) => parseInt(it))
  const min = Math.min(...positions)
  const max = Math.max(...positions)

  let smallestFuelUsage = Number.MAX_VALUE

  for (let i = min; i <= max; i++) {
    const fuelUsageForI = positions.reduce(
      (previousValue, currentValue) => previousValue + Math.abs(currentValue - i),
      0
    )

    smallestFuelUsage = Math.min(smallestFuelUsage, fuelUsageForI)
  }

  return smallestFuelUsage
}
