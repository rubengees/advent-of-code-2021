type Point = {
  x: number
  y: number
}

class Rect {
  constructor(readonly xStart: number, readonly xEnd: number, readonly yStart: number, readonly yEnd: number) {}

  includes(other: Point) {
    return other.x >= this.xStart && other.x <= this.xEnd && other.y >= this.yStart && other.y <= this.yEnd
  }
}

function simulate(targetArea: Rect, xVelocity: number, yVelocity: number): boolean {
  const currentPoint = { x: 0, y: 0 }

  while (currentPoint.y + yVelocity >= targetArea.yStart && currentPoint.x + xVelocity <= targetArea.xEnd) {
    currentPoint.x += xVelocity
    currentPoint.y += yVelocity

    if (xVelocity !== 0) {
      if (xVelocity > 0) {
        xVelocity--
      } else {
        xVelocity++
      }
    }

    yVelocity--

    if (targetArea.includes(currentPoint)) {
      return true
    }
  }

  return false
}

export default function day17_part2(input: string[]): number {
  const [, xStart, xEnd, yStart, yEnd] = input[0].match(/.*x=(-?\d+)..(-?\d+).*y=(-?\d+)..(-?\d+)/) as RegExpMatchArray
  const targetRect = new Rect(parseInt(xStart), parseInt(xEnd), parseInt(yStart), parseInt(yEnd))

  // Brute force the solution by trying all reasonable possible trajectories.
  const yStartBound = targetRect.yStart
  const yEndBound = targetRect.xEnd * 2

  let count = 0
  for (let x = 1; x <= targetRect.xEnd; x++) {
    for (let y = yStartBound; y <= yEndBound; y++) {
      count += simulate(targetRect, x, y) ? 1 : 0
    }
  }

  return count
}
