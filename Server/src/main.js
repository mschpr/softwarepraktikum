import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

// liefert alle Vokabeln
export async function getVocabulary() {
    let allData = await prisma.vokabelEnglisch.findMany();
    return allData
}

// liefert IDVokabel, die nicht abgefragt werden sollen
async function getProgress() {
    let allData = await prisma.lernfortschrittEnglisch.findMany();
    let allIDVokabel = [];
    let today = new Date();
    allData.forEach(function (e) {
        if (e.Datum > today || e.Stufe > 3) {
            allIDVokabel.push(e.IDVokabel)
        }
    })
    return allIDVokabel
}

export async function updateProgress(IDVokabel) {
    let vocabulary = await prisma.lernfortschrittEnglisch.findMany({
        where: {
            IDVokabel: IDVokabel,
        },
    })
    let today = new Date();
    if (vocabulary.length === 0) {
        await prisma.lernfortschrittEnglisch.create({
            data: {
                IDVokabel: IDVokabel,
                Datum: today.addDays(7),
                Stufe: 1,
            },
        })
    }

    else {
        await prisma.lernfortschrittEnglisch.updateMany({
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
export async function learn() {
    let vocabulary = await getVocabulary();
    let progress = await getProgress();
    vocabulary = vocabulary.filter(function (entry) { return progress.indexOf(entry.ID) === -1 });
    if (vocabulary.length === 0) {
        console.log("Alle Vokabeln gelernt :D");
        return;
    }
    let randomNumber = Math.floor(Math.random() * vocabulary.length);
    return vocabulary[randomNumber];
}