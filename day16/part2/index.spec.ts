import { readInput } from "../../utils"
import day16_part2 from "./index"

describe("day 16 part 2", () => {
  test("example 1", () => {
    const example = ["C200B40A82"]

    const result = day16_part2(example)

    expect(result).toEqual(3)
  })

  test("example 2", () => {
    const example = ["04005AC33890"]

    const result = day16_part2(example)

    expect(result).toEqual(54)
  })

  test("example 3", () => {
    const example = ["880086C3E88112"]

    const result = day16_part2(example)

    expect(result).toEqual(7)
  })

  test("example 4", () => {
    const example = ["CE00C43D881120"]

    const result = day16_part2(example)

    expect(result).toEqual(9)
  })

  test("example 5", () => {
    const example = ["D8005AC2A8F0"]

    const result = day16_part2(example)

    expect(result).toEqual(1)
  })

  test("example 6", () => {
    const example = ["F600BC2D8F"]

    const result = day16_part2(example)

    expect(result).toEqual(0)
  })

  test("example 7", () => {
    const example = ["9C005AC2F8F0"]

    const result = day16_part2(example)

    expect(result).toEqual(0)
  })

  test("example 8", () => {
    const example = ["9C0141080250320F1802104A08"]

    const result = day16_part2(example)

    expect(result).toEqual(1)
  })

  test("input", async () => {
    const input = await readInput("day16/input.txt")
    const result = day16_part2(input)

    expect(result).toEqual(12883091136209)
  })
})
