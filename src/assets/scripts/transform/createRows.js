import numbers from "./rows/numbers"
import decimals from "./decimals"

export default function createRows(content) {
    const data = numbers(content[0])
    const rows = []

    for (let i = 1; i < content.length; i += 1) {
        let index = rows.length
        let row = decimals(content[i]).split(",")
        let obj = { header: {}, saljare: {}, kopare: {}, arbetstyp: {} }

        obj.saljare.rst = row[data.saljare.rst] || null
        obj.saljare.cop = row[data.saljare.cop] || null
        obj.saljare.kontakt = row[data.saljare.kontakt] || null
        obj.saljare.namn = row[data.saljare.namn] || null
        obj.kopare.rst = row[data.kopare.rst] || null
        obj.kopare.cop = row[data.kopare.cop] || null
        obj.kopare.kontakt = row[data.kopare.kontakt] || null
        obj.kopare.namn = row[data.kopare.namn] || null
        obj.arbetstyp.tillverkare = row[data.arbetstyp.tillverkare] || null
        obj.arbetstyp.arbetstyp = row[data.arbetstyp.arbetstyp] || null
        obj.header.saljare = row[data.header.saljare] || null
        obj.header.kopare = row[data.header.kopare] || null
        obj.header.arbetstyp = row[data.header.arbetstyp] || null
        obj.header.antal = row[data.header.antal] || null
        obj.header.typ = row[data.header.typ] || null
        obj.header.leverantor = row[data.header.leverantor] || null
        obj.header.text = row[data.header.text] || null
        obj.header.info = row[data.header.info] || null
        obj.header.valuta = row[data.header.valuta] || null
        obj.header.mangd = row[data.header.mangd] || null
        obj.header.inprisex = row[data.header.inprisex] || null
        obj.header.inprisin = row[data.header.inprisin] || null
        obj.header.procent = row[data.header.procent] || null
        obj.header.oh = row[data.header.oh] || null
        obj.header.totalt = row[data.header.totalt] || null
        obj.header.fakturanum = row[data.header.fakturanum] || null
        obj.header.kommentar = row[data.header.kommentar] || null
        obj.header.inpris = row[data.header.inpris] || null
        obj.header.start = row[data.header.start] || null
        obj.header.slut = row[data.header.slut] || null
        obj.header.perioder = row[data.header.perioder] || null
        obj.header.upfront = row[data.header.upfront] || null
        obj.header.rest = row[data.header.rest] || null
        obj.header.internfakt = row[data.header.internfakt] || null
        obj.header.intakt = row[data.header.intakt] || null
        obj.header.scan = row[data.header.scan] || null
        obj.header.now = row[data.header.now] || null
        obj.id = index

        rows[index] = obj
    }

    return rows
}