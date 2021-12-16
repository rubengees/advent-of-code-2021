abstract class Packet {
  protected constructor(readonly version: number) {}

  abstract calculate(): number
}

class LiteralPacket extends Packet {
  constructor(version: number, readonly value: number) {
    super(version)
  }

  calculate(): number {
    return this.value
  }
}

class OperatorPacket extends Packet {
  constructor(version: number, readonly typeId: number, readonly subPackets: Packet[]) {
    super(version)
  }

  calculate(): number {
    switch (this.typeId) {
      case 0:
        return this.subPackets.reduce((prev, curr) => prev + curr.calculate(), 0)
      case 1:
        return this.subPackets.slice(1).reduce((prev, curr) => prev * curr.calculate(), this.subPackets[0].calculate())
      case 2:
        return Math.min(...this.subPackets.map((it) => it.calculate()))
      case 3:
        return Math.max(...this.subPackets.map((it) => it.calculate()))
      case 5:
        return this.subPackets[0].calculate() > this.subPackets[1].calculate() ? 1 : 0
      case 6:
        return this.subPackets[0].calculate() < this.subPackets[1].calculate() ? 1 : 0
      case 7:
        return this.subPackets[0].calculate() === this.subPackets[1].calculate() ? 1 : 0
      default:
        throw new Error(`Unknown typeId: ${this.typeId}`)
    }
  }
}

type ParseResult = {
  packet: Packet
  remainder: string
}

function parseLiteralPacket(input: string, version: number): ParseResult {
  let value = ""
  let i = 0

  for (i; i + 5 <= input.length; i += 5) {
    value += input.slice(i + 1, i + 5)

    if (input[i] === "0") {
      break
    }
  }

  return { packet: new LiteralPacket(version, parseInt(value, 2)), remainder: input.slice(i + 5) }
}

function parseLengthOperatorPacket(input: string, length: number, typeId: number, version: number): ParseResult {
  const subPackets: Packet[] = []
  let remainder = input.slice(0, length)

  while (remainder.length > 0) {
    const parseResult = parsePacket(remainder)

    subPackets.push(parseResult.packet)
    remainder = parseResult.remainder
  }

  return { packet: new OperatorPacket(version, typeId, subPackets), remainder: input.slice(length) }
}

function parseCountOperatorPacket(input: string, count: number, typeId: number, version: number): ParseResult {
  const subPackets: Packet[] = []

  for (let i = 0; i < count; i++) {
    const parseResult = parsePacket(input)

    subPackets.push(parseResult.packet)
    input = parseResult.remainder
  }

  return { packet: new OperatorPacket(version, typeId, subPackets), remainder: input }
}

function parsePacket(input: string): ParseResult {
  const version = parseInt(input.slice(0, 3), 2)
  const typeId = parseInt(input.slice(3, 6), 2)

  if (typeId === 4) {
    return parseLiteralPacket(input.slice(6), version)
  } else {
    const lengthTypeId = input[6]

    if (lengthTypeId === "0") {
      const length = parseInt(input.slice(8, 22), 2)

      return parseLengthOperatorPacket(input.slice(22), length, typeId, version)
    } else if (lengthTypeId === "1") {
      const count = parseInt(input.slice(8, 18), 2)

      return parseCountOperatorPacket(input.slice(18), count, typeId, version)
    } else {
      throw new Error(`Unknown lengthTypeId ${lengthTypeId}`)
    }
  }
}

export default function day16_part2(input: string[]): number {
  const binaryInput = input[0]
    .split("")
    .map((it) => parseInt(it, 16))
    .map((it) => it.toString(2).padStart(4, "0"))
    .join("")

  const { packet } = parsePacket(binaryInput)

  return packet.calculate()
}
