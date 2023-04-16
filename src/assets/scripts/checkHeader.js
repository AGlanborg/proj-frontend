export default function checkHeader(head) {
    let template = [
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