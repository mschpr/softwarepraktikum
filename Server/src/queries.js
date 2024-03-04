import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

Date.prototype.addDays = function (days) {
    let date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

export async function getVocabulary(language) {
    return (await prisma[`Vocab${language}`].findMany());
}

export async function getProgressPerUser(language, IDUser) {
    let allData = await prisma[`Progress${language}`].findMany({
        where: {
            IDUser: IDUser,
        },
    });
    return allData
}

async function getIDDoNotLearn(language, IDUser) {
    let allData = await getProgressPerUser(language, IDUser);
    let IDDoNotLearn = [];
    let today = new Date();
    allData.forEach((e) => {
        if (e.date > today || e.stage > 3) {
            IDDoNotLearn.push(e.IDVocab)
        }
    })
    return IDDoNotLearn
}

export async function updateProgress(IDVocab, IDUser, language) {
    let tableName = `Progress${language}`;
    let progress = await getProgressPerUser(language, IDUser);
    progress = progress.filter((e) => { return e.IDVocab === IDVocab })
    let today = new Date();
    if (progress.length === 0) {
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
                IDVocab: progress[0].IDVocab,
                IDUser: progress[0].IDUser,
            },
            data: {
                date: today.addDays(7),
                IDUser: IDUser,
                stage: ++progress[0].stage,
            },
        })
    }
}

export async function learn(language, IDUser) {
    let vocabulary = await getVocabulary(language);
    let progress = await getIDDoNotLearn(language, IDUser);
    vocabulary = vocabulary.filter((e) => { return progress.indexOf(e.ID) === -1 });
    if (vocabulary.length === 0) {
        return;
    }
    let randomNumber = Math.floor(Math.random() * vocabulary.length);
    return vocabulary[randomNumber];
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

export async function setPassword(ID, password) {
    await prisma.Users.updateMany({
        where: {
            ID: ID
        },
        data: {
            password: password
        },
    })
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

export async function removeUserFromClass(username, IDClass) {
    let user = await getUserByUsername(username);
    await prisma.ClassMembers.deleteMany({
        where: {
            IDClass: IDClass,
            IDUser: user[0].ID
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
    let allData = [];
    for (const member of members) {
        let result = await getProgressPerUser(language, member.IDUser)
        allData.push(...result);
    };
    return allData;
}

export async function deleteClass(ID) {
    await prisma.Classes.delete({
        where: {
            ID: ID,
        },
    })
}