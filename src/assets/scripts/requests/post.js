import config from "@/../config/config.json";

export async function csv(data) {
    const response = await fetch(`${config.URL}/crud/create/csv`, {
        method: "POST",
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

export async function form(data, url) {
    const response = await fetch(`${config.URL}/crud/create/form/${url}`, {
        method: "POST",
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