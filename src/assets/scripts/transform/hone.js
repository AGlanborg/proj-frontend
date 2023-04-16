export default function hone(text) {
    if (text.includes('\r')) {
        text = text.replaceAll('\r', '\n')
    }
    if (text.includes('\n\n')) {
        text = text.replaceAll('\n\n', '\n')
    }
    if (text.includes(';')) {
        text = text.replaceAll(';', ',')
    }
    return text
}