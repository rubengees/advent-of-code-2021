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

function findPaths(
  graph: Map<string, string[]>,
  current: string[],
  marked: { [key: string]: number } = {}
): string[][] {
  const lastPoint = current[current.length - 1]
  const hasVisitedTwice = Object.values(marked).includes(2)

  if (lastPoint === "end") {
    return [current]
  }

  const edges =
    graph
      .get(lastPoint)
      ?.filter((it) => it !== "start")
      ?.filter((it) => !hasVisitedTwice || (marked[it] ?? 0) < 1) ?? []

  return edges.flatMap((it) => {
    const newMarked = { ...marked, ...{ [it]: (marked[it] ?? 0) + (canBeVisitedMultipleTimes(it) ? 0 : 1) } }

    return findPaths(graph, [...current, it], newMarked)
  })
}

export default function day12_part2(input: string[]): number {
  const graph = parseGraph(input)
  const paths = findPaths(graph, ["start"], {})

  return paths.length
}
