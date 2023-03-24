import { form } from "../requests/post"

export default async function upload(obj, url) {
    let data =  {}

    data.content = 'Säljare, Köpare, Arbetstyp, Antal Poster, Typ, Leverantör, Text, Kontaktinfo, Valuta, Antal licenser, Inpris ex. moms, Inpris inkl. moms, Procent (%), OH, Totalt inkl. moms och OH, Fakturanummer, Kommentar, Internpris, Periodisering Start, Periodisering Slut, Periodisering antal månader, Antal månader upfront, Antal månader resterande, Internfakt. per period, Intakt, Check, Now'
    data.content += `\n${obj.saljare}, ${obj.kopare}, ${obj.arbetstyp}, ${obj.antal}, ${obj.typ}, ${obj.leverantor}, ${obj.text}, ${obj.info}, ${obj.valuta}, ${obj.mangd}, ${obj.inprisex}, ${obj.inprisin}, ${obj.procent}, ${obj.oh}, ${obj.totalt}, ${obj.fakturanum}, ${obj.kommentar}, ${obj.inpris}, ${obj.start}, ${obj.slut}, ${obj.perioder}, ${obj.internfakt}, ${obj.upfront}, ${obj.rest}, ${obj.intakt}, ${obj.scan}, ${obj.now},`

    data.guide = true

    return form(data, url)
}