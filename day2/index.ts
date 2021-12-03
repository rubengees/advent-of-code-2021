export default function day2(input: string[]): number {
  let position = 0
  let depth = 0

  for (const part of input) {
    const [name, amount] = part.split(" ")

    switch (name) {
      case "forward":
        position += parseInt(amount)
        break
      case "down":
        depth += parseInt(amount)
        break
      case "up":
        depth -= parseInt(amount)
        break
    }
  }

  return position * depth
}
