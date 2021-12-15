class PriorityNode<T> {
  constructor(readonly value: T, readonly priority: number) {}
}

class PriorityQueue<T> {
  private readonly items: PriorityNode<T>[] = []

  push(value: T, priority: number) {
    const newNode = new PriorityNode(value, priority)

    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].priority > newNode.priority) {
        this.items.splice(i, 0, newNode)

        return
      }
    }

    // Item has lower priority than any other item. Push it to the end.
    this.items.push(newNode)
  }

  pop(): T | undefined {
    return this.items.shift()?.value
  }

  isEmpty() {
    return this.items.length == 0
  }
}

class Point {
  constructor(readonly x: number, readonly y: number, readonly weight: number) {}

  get key(): string {
    return `${this.x}-${this.y}`
  }

  eq(other: Point): boolean {
    return this.x === other.x && this.y === other.y
  }
}

function findNeighbours(matrix: Point[][], point: Point): Point[] {
  const { x, y } = point

  return [
    { x: x - 1, y },
    { x: x + 1, y },
    { x, y: y - 1 },
    { x, y: y + 1 },
  ]
    .map(({ x, y }) => matrix[x]?.[y])
    .filter((it) => it)
}

function aStar(matrix: Point[][], start: Point, goal: Point, h: (point: Point) => number): number {
  const queue = new PriorityQueue<Point>()

  const gScore = new Map<string, number>()
  const fScore = new Map<string, number>()

  queue.push(start, 0)

  gScore.set(start.key, 0)
  fScore.set(start.key, h(start))

  for (let current = queue.pop(); current; current = queue.pop()) {
    if (current.eq(goal)) {
      return gScore.get(current.key) ?? -1
    }

    for (const neighbour of findNeighbours(matrix, current)) {
      const neighbourScore = (gScore.get(current.key) ?? Infinity) + neighbour.weight

      if (neighbourScore < (gScore.get(neighbour.key) ?? Infinity)) {
        gScore.set(neighbour.key, neighbourScore)
        fScore.set(neighbour.key, neighbourScore + h(neighbour))

        queue.push(neighbour, neighbourScore + h(neighbour))
      }
    }
  }

  return -1
}

export default function day15_part2(input: string[]): number {
  const matrix: Point[][] = []

  for (let x = 0; x < input.length * 5; x++) {
    matrix.push([])

    for (let y = 0; y < input[0].length * 5; y++) {
      const xIteration = Math.floor(x / input.length)
      const yIteration = Math.floor(y / input.length)
      const extrapolatedX = x - xIteration * input.length
      const extrapolatedY = y - yIteration * input.length

      const value = ((parseInt(input[extrapolatedX][extrapolatedY]) + xIteration + yIteration - 1) % 9) + 1

      matrix[x][y] = new Point(x, y, value)
    }
  }

  const width = matrix.length
  const height = matrix[0].length

  return aStar(
    matrix,
    matrix[0][0],
    matrix[width - 1][height - 1],
    (point) => Math.abs(point.x - width) + Math.abs(point.y - height)
  )
}
