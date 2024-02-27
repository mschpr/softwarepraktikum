import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import '../index.css';

async function getProgress(language) {
    const response = await fetch(`http://localhost:3001/sql/getProgressComplete?language=${language}`, { credentials: "include" });
    if (response.status !== 200) { window.location.replace("http://localhost:3000/login"); };
    return response.json();
}

async function getVocabulary(language) {
    const response = await fetch(`http://localhost:3001/sql/getVocabulary?language=${language}`, { credentials: "include" })
    if (response.status !== 200) { window.location.replace("http://localhost:3000/login"); };
    return response.json();
}

let learned = [0, 0];
let unfinished = [0, 0];
let notStarted = [0, 0];

let EnglishProgress = await getProgress("English");
let SpanishProgress = await getProgress("Spanish");
let EnglishAll = await getVocabulary("English");
let SpanishAll = await getVocabulary("Spanish");
let EnglishNotStarted = [];
let SpanishNotStarted = [];

EnglishAll.forEach(function (e) {
    if (!(EnglishProgress.includes(e))) {
        EnglishNotStarted.push(e)
    }
})
SpanishAll.forEach(function (e) {
    if (!(SpanishProgress.includes(e))) {
        SpanishNotStarted.push(e)
    }
})

learned[0] = EnglishProgress.filter(e => { return e.Stufe >= 5 }).length;
learned[1] = SpanishProgress.filter(e => { return e.Stufe >= 5 }).length;
unfinished[0] = EnglishProgress.filter(e => { return e.Stufe < 5 }).length;
unfinished[1] = SpanishProgress.filter(e => { return e.Stufe < 5 }).length;
notStarted[0] = EnglishNotStarted.length;
notStarted[1] = SpanishNotStarted.length;


const ClassChart = () => {
    return (<>
        <BarChart
            series={[
                { data: learned },
                { data: unfinished },
                { data: notStarted },
            ]}
            height={290}
            xAxis={[{ data: ["Englisch", "Spanisch"], scaleType: 'band' }]}
            margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
        />
    </>);
}

export default ClassChart;