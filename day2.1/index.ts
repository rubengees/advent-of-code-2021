export default function day2_1(input: string[]): number {
  let position = 0
  let depth = 0
  let aim = 0

  for (const part of input) {
    const [name, amount] = part.split(" ")
    const parsedAmount = parseInt(amount)

    switch (name) {
      case "forward":
        position += parsedAmount
        depth += aim * parsedAmount
        break
      case "down":
        aim += parsedAmount
        break
      case "up":
        aim -= parsedAmount
        break
    }
  }

  return position * depth
}
