import { readInput } from "../../utils"
import day16_part1 from "./index"

describe("day 16 part 1", () => {
  test("example literal", () => {
    const example = ["D2FE28"]

    const result = day16_part1(example)

    expect(result).toEqual(6)
  })

  test("example operator (0)", () => {
    const example = ["38006F45291200"]

    const result = day16_part1(example)

    expect(result).toEqual(9)
  })

  test("example operator (1)", () => {
    const example = ["EE00D40C823060"]

    const result = day16_part1(example)

    expect(result).toEqual(14)
  })

  test("example 1", () => {
    const example = ["8A004A801A8002F478"]

    const result = day16_part1(example)

    expect(result).toEqual(16)
  })

  test("example 2", () => {
    const example = ["620080001611562C8802118E34"]

    const result = day16_part1(example)

    expect(result).toEqual(12)
  })

  test("example 3", () => {
    const example = ["C0015000016115A2E0802F182340"]

    const result = day16_part1(example)

    expect(result).toEqual(23)
  })

  test("example 4", () => {
    const example = ["A0016C880162017C3686B18A3D4780"]

    const result = day16_part1(example)

    expect(result).toEqual(31)
  })

  test("input", async () => {
    const input = await readInput("day16/input.txt")
    const result = day16_part1(input)

    expect(result).toEqual(967)
  })
})
