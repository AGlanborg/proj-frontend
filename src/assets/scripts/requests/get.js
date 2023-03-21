import config from "@/../config/config.json";

export default async function one(tabel) {
    const response = await fetch(`${config.URL}/crud/read/${tabel}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });

    const result = await response.json();

    if (result.errors != undefined) {
        return result.errors
    }

    return result.data;
}