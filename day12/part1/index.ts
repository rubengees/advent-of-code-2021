function parseGraph(input: string[]): Map<string, string[]> {
  const lines: [string, string][] = input.map((it) => it.split("-")).map(([from, to]) => [from, to])
  const map = new Map<string, string[]>()

  for (const [from, to] of lines) {
    map.set(from, [...(map.get(from) || []), to])
    map.set(to, [...(map.get(to) || []), from])
  }

  return map
}

function canBeVisitedMultipleTimes(point: string): boolean {
  return point === point.toUpperCase()
}

function findPaths(graph: Map<string, string[]>, current: string[], marked: { [key: string]: boolean }): string[][] {
  const lastPoint = current[current.length - 1]

  if (lastPoint === "end") {
    return [current]
  }

  const edges = graph.get(lastPoint)?.filter((it) => !marked[it]) ?? []

  return edges.flatMap((it) =>
    findPaths(graph, [...current, it], { ...marked, ...{ [lastPoint]: !canBeVisitedMultipleTimes(lastPoint) } })
  )
}

export default function day12_part1(input: string[]): number {
  const graph = parseGraph(input)
  const paths = findPaths(graph, ["start"], {})

  return paths.length
}
