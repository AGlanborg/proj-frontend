export default function raw(data) {
  let text = "Id,"
  text += "Faktureringsperiod,";
  text += "Säljare,";
  text += "Köpare,";
  text += "Arbetstyp,";
  text += "Antal Poster,";
  text += "Typ,";
  text += "Leverantör,";
  text += "Text På Internfaktura,";
  text += "Kontaktinfo,";
  text += "Valuta,";
  text += "Antal licenser,";
  text += "Inpris ex. moms,";
  text += "Inpris inkl. moms,";
  text += "Procent (%),";
  text += "OH,";
  text += "Totalt. SEK. inkl. moms och OH,";
  text += "Fakturanummer,";
  text += "Kommentar,";
  text += "Internpris,";
  text += "Periodisering Start,";
  text += "Periodisering Slut,";
  text += "Periodisering antal månader,";
  text += "Antal månader upfront,";
  text += "Antal månader resterande,";
  text += "Internfakt. per period. SEK,";
  text += "Intäkt,";
  text += "Check\n";

  for (let i = 0; i < data.length; i += 1) {
    text += data[i].main_id + ","
    text += data[i].now + ","

    if (data[i].saljare.name) {
      text += data[i].saljare.rst + ","
    } else {
      text += data[i].saljare.copernicus + ","
    }
    if (data[i].kopare.name) {
      text += data[i].kopare.rst + ","
    } else {
      text += data[i].kopare.copernicus + ","
    }

    text += data[i].arbetstyp.arbetstyp + ","
    text += data[i].antal + ","
    text += data[i].typ + ","
    text += data[i].leverantor + ","
    text += data[i].text + ","
    text += data[i].info + ","
    text += data[i].valuta + ","
    text += data[i].mangd + ","
    text += data[i].inprisex + ","
    text += data[i].inprisin + ","
    text += data[i].procent + ","
    text += data[i].oh + ","
    text += data[i].totalt + ","
    text += data[i].fakturanum + ","
    text += data[i].kommentar + ","
    text += data[i].inpris + ","
    text += data[i].start + ","
    text += data[i].slut + ","
    text += data[i].perioder + ","
    text += data[i].upfront + ","
    text += data[i].rest + ","
    text += data[i].internfakt + ","
    text += data[i].intakt + ","
    text += data[i].scan + "\n"
  }

  text = text.substring(0, text.length - 1)

  return text
}