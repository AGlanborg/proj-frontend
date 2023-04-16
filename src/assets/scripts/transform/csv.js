import { csv } from "../requests/post"
import checkHeader from "../checkHeader"
import hone from "./hone"

export default async function upload(content) {
  let data = {}

  const txt = hone(content)

  if (checkHeader(txt.split("\n")[0])) {
    let content = txt.split('\n')

    data['header'] = content[0]

    content.shift()

    for (let i = 0; i < content.length; i += 1) {
      if (content[i] == '') {
        content.splice(i, 1)
        i = 0
      }
    }

    data['content'] = content

    return csv(data)
  }

  return { title: "Invalid content" }
}