import removeZero from "./transform/removeZero";

export default function checkMonth(start, slut, month) {
    start = start.split("-");
    slut = slut.split("-");
    month = month.split("-");

    start[1] = parseInt(removeZero(start[1]));
    start[0] = parseInt(start[0]);
    slut[1] = parseInt(removeZero(slut[1]));
    slut[0] = parseInt(slut[0]);
    month[1] = parseInt(removeZero(month[1]));
    month[0] = parseInt(month[0]);

    if (
        (month[0] == start[0] &&
            month[0] == slut[0] &&
            month[1] >= start[1] &&
            month[1] <= slut[1]) ||
        (month[0] == start[0] && month[0] < slut[0] && month[1] >= start[1]) ||
        (month[0] > start[0] && month[0] == slut[0] && month[1] <= slut[1]) ||
        (month[0] > start[0] && month[0] < slut[0])
    ) {
        return true;
    }

    return false;
}