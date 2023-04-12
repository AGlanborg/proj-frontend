import createMonths from "../transform/createMonths";
import checkMonth from "../checkMonth";

export default function levrantor(data, now) {
  const months = createMonths(data, now)

  let text = "Id,"
  text += "Faktureringsperiod,";
  text += "Köpare projektkod,";
  text += "Text På Internfaktura,";
  text += "Inpris. kr,";
  text += "Internfaktura per period. kr,";
  text += "Periodisering Start,";
  text += "Periodisering Slut,";
  text += "Periodisering antal månader,";

  for (let i = 0; i < months.length; i += 1) {
    text += months[i] + ","
  }

  text = text.substring(0, text.length - 1)

  text += "\n"

  for (let i = 0; i < data.length; i += 1) {
    text += data[i].main_id + ","
    text += data[i].now + ","

    if (data[i].kopare.name) {
      text += data[i].kopare.rst + ","
    } else {
      text += data[i].kopare.copernicus + ","
    }

    text += data[i].text + " | " + data[i].info + ","
    text += data[i].inpris + ","
    text += data[i].internfakt + ","
    text += data[i].start + ","
    text += data[i].slut + ","
    text += data[i].perioder + ","

    for (let n = 0; n < months.length; n += 1) {
      if (checkMonth(data[i].start, data[i].slut, months[n])) {
        text += parseFloat(data[i].oh / data[i].perioder).toFixed(2) + ","
      } else {
        text += ","
      }
    }

    text = text.substring(0, text.length - 1)

    text += "\n"
  }

  text = text.substring(0, text.length - 1)

  return text
}