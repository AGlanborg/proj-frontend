import { csv } from "../requests/post"

export default async function upload(text) {
  let data = {}

  const arr = [
    "RST nummer för säljare",
    "Copernicus nummer för säljare",
    "Kontaktperson för säljare",
    "Namn för säljare",
    "RST nummer för köpare",
    "Copernicus nummer för köpare",
    "Kontaktperson för köpare",
    "Namn för köpare",
    "Tillverkare",
    "Förkortning för arbetstyp",
    "Antal Poster",
    "Typ",
    "Leverantör",
    "Text på internfaktura",
    "Kontaktinfo",
    "Valuta",
    "Antal licenser",
    "Inpris ex. moms",
    "Procent (%)",
    "Fakturanummer",
    "Kommentar",
    "Periodisering Start",
    "Periodisering Slut",
    "Faktureringsperiod"
  ]

  if (text.includes('\r')) {
    text = text.replaceAll('\r', '\n')
  }
  if (text.includes('\n\n')) {
    text = text.replaceAll('\n\n', '\n')
  }
  if (text.includes(';')) {
    text = text.replaceAll(';', ',')
  }

  const head = text.split('\n')[0].toUpperCase()
  let headArr = head.split(',')

  for (let i = 0; i < headArr.length; i += 1) {
    headArr[i] = headArr[i].replace(/\s/g, '').toUpperCase()

    if(headArr[i] == "") {
      headArr.splice(i, 1)
      i = 0
    }
  }
  for (let i = 0; i < arr.length; i += 1) {
    arr[i] = arr[i].replace(/\s/g, '').toUpperCase()
  }

  if (
    headArr.sort().join(',').toUpperCase() == arr.sort().join(',').toUpperCase()
  ) {
    let content = text.split('\n')

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