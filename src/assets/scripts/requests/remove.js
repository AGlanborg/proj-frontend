import config from "@/../config/config.json";

export default async function put(data, title) {
    const response = await fetch(`${config.URL}/crud/delete/${title}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    const result = await response.json();

    if (result.errors != undefined) {
        return result.errors
    }

    return result.data;
}