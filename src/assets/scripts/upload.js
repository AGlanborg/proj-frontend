import csv from "./requests/create"

export default async function upload(text) {
    let data = {}

    const normal = '"Säljare", "Köpare", "Arbetstyp", "Antal Poster", "Typ", "Leverantör", "Text", "Kontaktinfo", "Valuta", "Antal licenser", "Inpris ex. moms", "Inpris inkl. moms", "Procent (%)", "OH", "Totalt inkl. moms och OH", "Fakturanummer", "Kommentar", "Internpris", "Periodisering Start", "Periodisering Slut", "Periodisering antal månader", "Antal månader upfront", "Antal månader resterande", "Internfakt. per period", "Intakt", "Check", "Now"'
    const normalArr = ["Säljare", "Köpare", "Arbetstyp", "Antal Poster", "Typ", "Leverantör", "Text", "Kontaktinfo", "Valuta", "Antal licenser", "Inpris ex. moms", "Inpris inkl. moms", "Procent (%)", "OH", "Totalt inkl. moms och OH", "Fakturanummer", "Kommentar", "Internpris", "Periodisering Start", "Periodisering Slut", "Periodisering antal månader", "Antal månader upfront", "Antal månader resterande", "Internfakt. per period", "Intakt", "Check", "Now"]
    const nicknames = '"saljare", "kopare", "arbetstyp", "antal", "typ", "leverantor", "text", "info", "valuta", "mangd", "inprisex", "inprisin", "procent", "oh", "totalt", "fakturanum", "kommentar", "inpris", "start", "slut", "perioder", "internfakt", "upfront", "rest", "intakt", "scan", "now"'
    const nicknamesArr = ["saljare", "kopare", "arbetstyp", "antal", "typ", "leverantor", "text", "info", "valuta", "mangd", "inprisex", "inprisin", "procent", "oh", "totalt", "fakturanum", "kommentar", "inpris", "start", "slut", "perioder", "internfakt", "upfront", "rest", "intakt", "scan", "now"]

    const head = text.split('\n')[0].toUpperCase()
    let headArr = head.split('", "')

    headArr[0] = headArr[0].replace('"', '')
    headArr[headArr.length - 1] = headArr[headArr.length - 1].replace('"', '')

    for (let i = 0; i < headArr.length; i += 1) {
        headArr[i] = headArr[i].replace(/\s/g, '').toUpperCase()
    }
    for (let i = 0; i < normalArr.length; i += 1) {
        normalArr[i] = normalArr[i].replace(/\s/g, '').toUpperCase()
    }

    if (head == normal.toUpperCase() || head == nicknames.toUpperCase()) {
        let content = text.split('\n')

        data['header'] = content[0]

        content.shift()

        data['content'] = content
        data['guide'] = true

        return csv(data)
    } else if (
        headArr.sort().join(',').toUpperCase() == normalArr.sort().join(',')
        ||
        headArr.sort().join(',').toUpperCase() == nicknamesArr.sort().join(',')
    ) {
        let content = text.split('\n')

        data['header'] = content[0]

        content.shift()

        data['content'] = content
        data['guide'] = false

        return csv(data)
    }

    return {title: "Invalid content"}
}