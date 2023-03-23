import { csv } from "../requests/post"

export default async function upload(text) {
    let data = {}

    let txt = '"RST nummer för säljare", '
    txt += '"Copernicus nummer för säljare", '
    txt += '"Kontaktperson för säljare", '
    txt += '"Namn för säljare", '
    txt += '"RST nummer för köpare", '
    txt += '"Copernicus nummer för köpare", '
    txt += '"Kontaktperson för köpare", '
    txt += '"Namn för köpare", '
    txt += '"Tillverkare", "Förkortning för arbetstyp", ';
    txt += '"Antal Poster", "Typ", "Leverantör", ';
    txt += '"Text", "Kontaktinfo", "Valuta", ';
    txt += '"Antal licenser", "Inpris ex. moms", ';
    txt += '"Inpris inkl. moms", "Procent (%)", "OH", ';
    txt += '"Totalt inkl. moms och OH", "Fakturanummer", ';
    txt += '"Kommentar", "Internpris", ';
    txt += '"Periodisering Start", "Periodisering Slut", ';
    txt += '"Periodisering antal månader", ';
    txt += '"Antal månader upfront", ';
    txt += '"Antal månader resterande", ';
    txt += '"Internfakt. per period", "Intakt", ';
    txt += '"Check", "Faktureringsperiod"';
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
        "Text",
        "Kontaktinfo",
        "Valuta",
        "Antal licenser",
        "Inpris ex. moms",
        "Inpris inkl. moms",
        "Procent (%)",
        "OH",
        "Totalt inkl. moms och OH",
        "Fakturanummer",
        "Kommentar",
        "Internpris",
        "Periodisering Start",
        "Periodisering Slut",
        "Periodisering antal månader",
        "Antal månader upfront",
        "Antal månader resterande",
        "Internfakt. per period",
        "Intakt",
        "Check",
        "Faktureringsperiod"
    ]

    const head = text.split('\n')[0].toUpperCase()
    let headArr = head.split('", "')

    headArr[0] = headArr[0].replace('"', '')
    headArr[headArr.length - 1] = headArr[headArr.length - 1].replace('"', '')

    for (let i = 0; i < headArr.length; i += 1) {
        headArr[i] = headArr[i].replace(/\s/g, '').toUpperCase()
    }
    for (let i = 0; i < arr.length; i += 1) {
        arr[i] = arr[i].replace(/\s/g, '').toUpperCase()
    }

    if (head == txt.toUpperCase()) {
        let content = text.split('\n')

        data['header'] = content[0]

        content.shift()

        data['content'] = content
        data['guide'] = true

        return csv(data)
    } else if (
        headArr.sort().join(',').toUpperCase() == arr.sort().join(',').toUpperCase()
    ) {
        let content = text.split('\n')

        data['header'] = content[0]

        content.shift()

        data['content'] = content
        data['guide'] = false

        return csv(data)
    }

    return { title: "Invalid content" }
}