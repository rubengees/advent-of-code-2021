type Point = {
  x: number
  y: number
}

function parsePoint(input: string): Point {
  const [x, y] = input.split(",")

  return { x: parseInt(x), y: parseInt(y) }
}

function countIntersections(vectors: [Point, Point][]): number {
  const map = new Map<string, number>()

  for (const [from, to] of vectors) {
    const distance = Math.max(Math.abs(from.x - to.x), Math.abs(from.y - to.y)) + 1

    for (let i = 0; i < distance; i++) {
      const x = from.x > to.x ? from.x - i : from.x < to.x ? from.x + i : from.x
      const y = from.y > to.y ? from.y - i : from.y < to.y ? from.y + i : from.y

      const point = JSON.stringify({ x, y })

      map.set(point, (map.get(point) ?? 0) + 1)
    }
  }

  return Array.from(map.values()).filter((it) => it > 1).length
}

export default function day5_part1(input: string[]): number {
  const vectors: [Point, Point][] = input.map((it) => {
    const [from, to] = it.split(" -> ")

    return [parsePoint(from), parsePoint(to)]
  })

  const straightLines: [Point, Point][] = vectors.filter(([from, to]) => from.x === to.x || from.y === to.y)

  return countIntersections(straightLines)
}
