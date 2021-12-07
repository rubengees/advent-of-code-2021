import fs, { PathOrFileDescriptor } from "fs"

export async function readInput(path: PathOrFileDescriptor): Promise<string[]> {
  return new Promise((resolve, reject) =>
    fs.readFile(path, "utf-8", (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data.trim().split("\n"))
      }
    })
  )
}
