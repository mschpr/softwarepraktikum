import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import '../index.css';

function getProgress(language) {
    return fetch(`http://localhost:3001/Progress?language=${language}`)
        .then(response => { return response.json() })
}

function getVocabulary(language) {
    return fetch(`http://localhost:3001/Vocabulary?language=${language}`)
        .then(response => { return response.json() })
}

let EnglishProgress = await getProgress("Englisch");
let SpanishProgress = await getProgress("Spanisch");
let EnglishAll = await getVocabulary("Englisch");
let SpanishAll = await getVocabulary("Spanisch");
let EnglishNotStarted = [];
let SpanishNotStarted = [];

let learned = [0, 0]
let unfinished = [0, 0]
let notStarted = [0, 0]

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


const Chart = () => {
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

export default Chart;