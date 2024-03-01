export async function getProgressPerUser(language) {
    const response = await fetch(`http://localhost:3001/sql/getProgressPerUser?language=${language}`, { credentials: "include" });
    if (response.status !== 200) { window.location.replace("http://localhost:3000/login"); };
    return response.json();
};

export async function getClassProgress(IDClass, language) {
    let req = { IDClass: IDClass, language: language };
    const response = await fetch("http://localhost:3001/sql/getClassProgress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req),
        credentials: "include"
    })
    return response.json();
};

export async function getVocabulary(language) {
    const response = await fetch(`http://localhost:3001/sql/getVocabulary?language=${language}`, { credentials: "include" })
    if (response.status !== 200) { window.location.replace("http://localhost:3000/login"); };
    return response.json();
};

function searchInObject(array, value) {
    return array.some(function (object) {
        return object.IDVocab === value;
    })
};

export function getNotStarted(arrayAll, arrayProgress) {
    let arrayNotStarted = [];
    arrayAll.forEach(function (e) {
        if (!(searchInObject(arrayProgress, e.ID))) {
            arrayNotStarted.push(e.ID);
        }
    });
    return arrayNotStarted;
};
