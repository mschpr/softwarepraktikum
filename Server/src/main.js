import { PrismaClient } from "@prisma/client";
import passport from "passport";
const prisma = new PrismaClient();

Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

// liefert alle Vokabeln
export async function getVocabulary(language) {
    let tableName = `Vocab${language}`;
    let allData = await prisma[tableName].findMany();
    return allData
}

// liefert IDVokabel, die nicht abgefragt werden sollen
async function getProgress(language) {
    let tableName = `Progress${language}`;
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

export async function updateProgress(IDVocab, IDUser, language) {
    let tableName = `Progress${language}`;
    let vocabulary = await prisma[tableName].findMany({
        where: {
            IDVocab: IDVocab,
            IDUser: IDUser,
        },
    })
    let today = new Date();
    if (vocabulary.length === 0) {
        await prisma[tableName].create({
            data: {
                IDVocab: IDVocab,
                IDUser: IDUser,
                date: today.addDays(7),
                stage: 1,
            },
        })
    }

    else {
        await prisma[tableName].updateMany({
            where: {
                IDVocab: vocabulary[0].IDVocab,
                IDUser: vocabulary[0].IDUser,
            },
            data: {
                date: today.addDays(7),
                IDUser: IDUser,
                stage: ++vocabulary[0].stage,
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

export async function getProgressComplete(language, IDUser) {
    let tableName = `Progress${language}`;
    let allData = await prisma[tableName].findMany({
        where: {
            IDUser: IDUser,
        },
    });
    return allData
}

export async function getUserByUsername(username) {
    let user = await prisma.Users.findMany({
        where: {
            username: username
        },
    })
    return user
}

export async function getUserByID(ID) {
    let user = await prisma.Users.findMany({
        where: {
            ID: ID
        },
    })
    return user
}

export async function setUser(username, password, name) {
    await prisma.Users.create({
        data: {
            username: username,
            password: password,
            name: name,
        },
    })
}

export async function getPassword(username) {
    let user = await prisma.Users.findMany({
        where: {
            username: username
        },
    })
    return user[0].password
}

export async function getClassesByMember(IDUser) {
    let allData = await prisma.ClassMembers.findMany({
        where: {
            IDUser: IDUser
        },
        include: {
            Classes: true
        }
    })
    return allData
}

export async function addUserToClass(username, IDClass) {
    let user = await getUserByUsername(username);
    await prisma.ClassMembers.create({
        data: {
            IDUser: user[0].ID,
            IDClass: IDClass
        },
    })
}

export async function createClass(name, teacher, language) {
    const newClass = await prisma.classes.create({
        data: {
            name: name,
            teacher: teacher,
            language: language
        },
    })
    await addUserToClass(teacher, newClass.ID);
}

async function getClassMembers(IDClass) {
    let allData = await prisma.ClassMembers.findMany({
        where: {
            IDClass: IDClass,
        }
    })
    return allData
}

export async function getClassProgress(IDClass, language) {
    let members = await getClassMembers(IDClass);
    let tableName = `Progress${language}`;
    let allData = [];
    for (const member of members) {
        let result = (await prisma[tableName].findMany({
            where: {
                IDUser: member.IDUser,
            },
        }));
        allData.push(...result);
    };
    return allData;
}