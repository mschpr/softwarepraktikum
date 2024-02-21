import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

// liefert alle Vokabeln
export async function getVocabulary(language) {
    let tableName = `Vokabel${language}`;
    let allData = await prisma[tableName].findMany();
    return allData
}

// liefert IDVokabel, die nicht abgefragt werden sollen
async function getProgress(language) {
    let tableName = `Lernfortschritt${language}`;
    let allData = await prisma[tableName].findMany();
    let allIDVokabel = [];
    let today = new Date();
    allData.forEach(function (e) {
        if (e.Datum > today || e.Stufe > 3) {
            allIDVokabel.push(e.IDVokabel)
        }
    })
    return allIDVokabel
}

export async function updateProgress(IDVokabel, language) {
    let tableName = `Lernfortschritt${language}`;
    let vocabulary = await prisma[tableName].findMany({
        where: {
            IDVokabel: IDVokabel,
        },
    })
    let today = new Date();
    if (vocabulary.length === 0) {
        await prisma[tableName].create({
            data: {
                IDVokabel: IDVokabel,
                Datum: today.addDays(7),
                Stufe: 1,
            },
        })
    }

    else {
        await prisma[tableName].updateMany({
            where: {
                IDVokabel: vocabulary[0].IDVokabel,
            },
            data: {
                Datum: today.addDays(7),
                Stufe: ++vocabulary[0].Stufe,
            },
        })
    }
}

// gibt zu lernende Vokabel aus
export async function learn(language) {
    let vocabulary = await getVocabulary(language);
    let progress = await getProgress(language);
    vocabulary = vocabulary.filter(function (entry) { return progress.indexOf(entry.ID) === -1 });
    if (vocabulary.length === 0) {
        console.log("Alle Vokabeln gelernt :D");
        return;
    }
    let randomNumber = Math.floor(Math.random() * vocabulary.length);
    return vocabulary[randomNumber];
}

export async function getProgressComplete(language) {
    let tableName = `Lernfortschritt${language}`;
    let allData = await prisma[tableName].findMany();
    return allData
}