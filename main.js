// import * as db from './database/index.js';

// let results = db.getVokabelEnglisch();
// console.table(results.rows);

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function query() {
    let allData = await prisma.vokabelEnglisch.findMany()
    return allData
}

results = query().catch(async (e) => console.error(e))
console.log(results);