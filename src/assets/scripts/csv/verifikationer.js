export default function levrantor(data) {
  let text = "Id,"
  text += "Faktureringsperiod,";
  text += "Säljare,";
  text += "Köpare,";
  text += "Arbetstyp,";
  text += "Antal Poster,";
  text += "Kostnad,";
  text += "Text På Internfaktura\n";

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
    text += data[i].totalt + ","
    text += data[i].text + "\n"
  }

  text = text.substring(0, text.length - 1)

  return text
}