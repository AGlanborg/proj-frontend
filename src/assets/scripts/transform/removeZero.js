export default function removeZero(text) {
    if (text.includes("0")) {
      text.replace("0", "");
    }
    return text;
}