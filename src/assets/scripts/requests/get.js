import config from "@/../config/config.json";

export async function all() {
    const response = await fetch(`${config.URL}/crud/read/all`, {
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