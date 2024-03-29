const STORAGE_TOKEN = '245PH4RA4908QYBBA5OH0PK0K6PZWF7PJJ3CQ9LN';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';


async function setItemToStorage(key, value) {
    const payload = { key, value, token: STORAGE_TOKEN };
    return fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload) })
        .then(res => res.json());
}

async function getItemFromStorage(key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    return fetch(url).then(res => res.json()).then(res => {
        // Verbesserter code
        if (res.data) {
            return res.data.value;
        }
        throw `Could not find data with key "${key}".`;
    });
}