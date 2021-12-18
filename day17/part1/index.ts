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

// Simulates a set of velocities until the target area can not be reached anymore.
function simulate(targetArea: Rect, xVelocity: number, yVelocity: number): number {
  const currentPoint = { x: 0, y: 0 }
  let highestY = 0

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

    highestY = Math.max(highestY, currentPoint.y)

    if (targetArea.includes(currentPoint)) {
      return highestY
    }
  }

  return -1
}

export default function day17_part1(input: string[]): number {
  const [, xStart, xEnd, yStart, yEnd] = input[0].match(/.*x=(-?\d+)..(-?\d+).*y=(-?\d+)..(-?\d+)/) as RegExpMatchArray
  const targetRect = new Rect(parseInt(xStart), parseInt(xEnd), parseInt(yStart), parseInt(yEnd))

  // Brute force the solution by trying all reasonable possible trajectories.
  const yStartBound = targetRect.yStart
  const yEndBound = targetRect.xEnd * 2

  let maxY = -1
  for (let x = 1; x <= targetRect.xEnd; x++) {
    for (let y = yStartBound; y <= yEndBound; y++) {
      maxY = Math.max(maxY, simulate(targetRect, x, y))
    }
  }

  return maxY
}
