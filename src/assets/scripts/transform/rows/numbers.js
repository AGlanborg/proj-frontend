import csvHeader from "@/assets/templates/csvHeaderObject.json"

export default function numbers(head) {
    let data = { header: {}, saljare: {}, kopare: {}, arbetstyp: {} }
    let template = {...csvHeader}
    let content = head.split(",")

    for (let i = 0; i < content.length; i += 1) {
        content[i] = content[i].replace(/\s/g, '').toUpperCase()

        if (content[i] == "") {
            content.splice(i, 1)
            i = 0
        }
    }

    data.saljare.rst = content.indexOf(template.saljare.rst.replace(/\s/g, '').toUpperCase())
    data.saljare.cop = content.indexOf(template.saljare.cop.replace(/\s/g, '').toUpperCase())
    data.saljare.kontakt = content.indexOf(template.saljare.kontakt.replace(/\s/g, '').toUpperCase())
    data.saljare.namn = content.indexOf(template.saljare.namn.replace(/\s/g, '').toUpperCase())
    data.kopare.rst = content.indexOf(template.kopare.rst.replace(/\s/g, '').toUpperCase())
    data.kopare.cop = content.indexOf(template.kopare.cop.replace(/\s/g, '').toUpperCase())
    data.kopare.kontakt = content.indexOf(template.kopare.kontakt.replace(/\s/g, '').toUpperCase())
    data.kopare.namn = content.indexOf(template.kopare.namn.replace(/\s/g, '').toUpperCase())
    data.arbetstyp.tillverkare = content.indexOf(template.arbetstyp.tillverkare.replace(/\s/g, '').toUpperCase())
    data.arbetstyp.arbetstyp = content.indexOf(template.arbetstyp.arbetstyp.replace(/\s/g, '').toUpperCase())
    data.header.saljare = null
    data.header.kopare = null
    data.header.arbetstyp = null
    data.header.antal = content.indexOf(template.header.antal.replace(/\s/g, '').toUpperCase())
    data.header.typ = content.indexOf(template.header.typ.replace(/\s/g, '').toUpperCase())
    data.header.leverantor = content.indexOf(template.header.leverantor.replace(/\s/g, '').toUpperCase())
    data.header.text = content.indexOf(template.header.text.replace(/\s/g, '').toUpperCase())
    data.header.info = content.indexOf(template.header.info.replace(/\s/g, '').toUpperCase())
    data.header.valuta = content.indexOf(template.header.valuta.replace(/\s/g, '').toUpperCase())
    data.header.mangd = content.indexOf(template.header.mangd.replace(/\s/g, '').toUpperCase())
    data.header.inprisex = content.indexOf(template.header.inprisex.replace(/\s/g, '').toUpperCase())
    data.header.inprisin = null
    data.header.procent = content.indexOf(template.header.procent.replace(/\s/g, '').toUpperCase())
    data.header.oh = null
    data.header.totalt = null
    data.header.fakturanum = content.indexOf(template.header.fakturanum.replace(/\s/g, '').toUpperCase())
    data.header.kommentar = content.indexOf(template.header.kommentar.replace(/\s/g, '').toUpperCase())
    data.header.inpris = null
    data.header.start = content.indexOf(template.header.start.replace(/\s/g, '').toUpperCase())
    data.header.slut = content.indexOf(template.header.slut.replace(/\s/g, '').toUpperCase())
    data.header.perioder = null
    data.header.upfront = null
    data.header.rest = null
    data.header.internfakt = null
    data.header.intakt = null
    data.header.scan = null
    data.header.now = content.indexOf(template.header.now.replace(/\s/g, '').toUpperCase())

    return data
}