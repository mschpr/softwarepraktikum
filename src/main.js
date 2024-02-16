import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

// liefert alle Vokabeln
async function getVocabulary() {
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

async function updateProgress(IDVokabel) {
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
        await prisma.lernfortschrittEnglisch.update({
            where: {
                ID: vocabulary[0].ID,
            },
            data: {
                Datum: today,
                Stufe: ++vocabulary[0].Stufe,
            },
        })
    }
}

// fragt eine zu lernende Vokabel ab und aktualisiert ggf. die Stufe
async function learn() {
    let vocabulary = await getVocabulary();
    let progress = await getProgress();
    vocabulary = vocabulary.filter(function (e) { return progress.indexOf(e.ID) === -1 });
    if (vocabulary.length === 0) {
        console.log("Alle Vokabeln gelernt :D");
        return;
    }
    let randomNumber = Math.floor(Math.random() * vocabulary.length);
    //let randomNumber = 4;
    console.log("Übersetze: " + vocabulary[randomNumber].Vokabel);
    let userInput = vocabulary[randomNumber].Uebersetzung;
    //let userInput = "";
    if (userInput === vocabulary[randomNumber].Uebersetzung) {
        console.log("Korrekt!");
        updateProgress(vocabulary[randomNumber].ID);
    }
    else {
        console.log("Falsch! Korrekt ist: " + vocabulary[randomNumber].Uebersetzung);
    }
}

//while (true) { await learn() }
learn()