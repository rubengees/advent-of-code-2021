import fs, { PathOrFileDescriptor } from "fs"

export function readInput(path: PathOrFileDescriptor): string[] {
  return fs
    .readFileSync(path, "utf-8")
    .trim()
    .split("\n")
    .filter((it) => !!it)
}
