import fs, { PathOrFileDescriptor } from "fs-extra"

export async function readInput(path: PathOrFileDescriptor): Promise<string[]> {
  const file = await fs.readFile(path)

  return file.toString().trim().split("\n")
}
