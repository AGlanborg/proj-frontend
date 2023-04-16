import csvHeader from "@/assets/templates/csvHeaderArray.json"

export default function checkHeader(head) {
    let template = csvHeader
    let content = head.split(',')
    let result = true

    for (let i = 0; i < content.length; i += 1) {
        content[i] = content[i].replace(/\s/g, '').toUpperCase()

        if (content[i] == "") {
            content.splice(i, 1)
            i = 0
        }
    }

    for (let i = 0; i < template.length; i += 1) {
        template[i] = template[i].replace(/\s/g, '').toUpperCase()
    }

    template.forEach((heading) => {
        if (!content.includes(heading)) {
            result = false
        }
    })

    return result
}