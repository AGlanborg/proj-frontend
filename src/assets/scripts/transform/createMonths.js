import removeZero from "./removeZero";

export default function createMonths(data, now) {
    let min = now.split("-");
    let max = now.split("-");
    let loop = true;

    let content = []

    min[1] = parseInt(removeZero(min[1]));
    min[0] = parseInt(min[0]);
    max[1] = parseInt(removeZero(max[1]));
    max[0] = parseInt(max[0]);

    data.forEach((item) => {
        let start = item.start.split("-");
        let end = item.slut.split("-");

        start[1] = parseInt(removeZero(start[1]));
        start[0] = parseInt(start[0]);
        end[1] = parseInt(removeZero(end[1]));
        end[0] = parseInt(end[0]);

        if (start[0] < min[0] || (start[0] == min[0] && start[1] < min[1])) {
            min = start;
        }

        if (end[0] > max[0] || (end[0] == max[0] && end[1] > max[1])) {
            max = end;
        }
    });

    while (loop) {
        if (min[1].toString().length == 2) {
            content.push(`${min[0]}-${min[1]}`);
        } else {
            content.push(`${min[0]}-0${min[1]}`);
        }

        if (min[0] == max[0] && min[1] == max[1]) {
            loop = false;
        }

        if (min[1] == 12) {
            min[1] = 1;
            min[0] += 1;
        } else {
            min[1] += 1;
        }
    }

    return content
}