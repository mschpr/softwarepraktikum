import { useEffect, useState } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import '../index.css';

async function getProgress(IDClass, language) {
    let req = { IDClass: IDClass, language: language };
    const response = await fetch("http://localhost:3001/sql/getClassProgress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req),
        credentials: "include"
    })
    return response.json();
}

async function getVocabulary(language) {
    const response = await fetch(`http://localhost:3001/sql/getVocabulary?language=${language}`, { credentials: "include" })
    return response.json();
}

function searchInObject(array, value) {
    return array.some(function (object) {
        return object.IDVocab === value;
    })
}

let EnglishAll = await getVocabulary("English");
let SpanishAll = await getVocabulary("Spanish");


function ClassChart(props) {

    let learned = [0, 0];
    let unfinished = [0, 0];
    let notStarted = [0, 0];
    let EnglishNotStarted = [];
    let SpanishNotStarted = [];

    const [EnglishProgress, SetEnglishProgress] = useState([]);
    const [SpanishProgress, SetSpanishProgress] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            SetEnglishProgress(await getProgress(props.IDClass, "English"));
            SetSpanishProgress(await getProgress(props.IDClass, "Spanish"));
        };
        fetchData();
    }, []);

    EnglishAll.forEach(function (e) {
        if (!(searchInObject(EnglishProgress, e.ID))) {
            EnglishNotStarted.push(e.ID);
        }
    });

    SpanishAll.forEach(function (e) {
        if (!(searchInObject(SpanishProgress, e.ID))) {
            SpanishNotStarted.push(e.ID);
        }
    });

    learned[0] = EnglishProgress.filter(e => { return e.stage >= 5 }).length;
    learned[1] = SpanishProgress.filter(e => { return e.stage >= 5 }).length;
    unfinished[0] = EnglishProgress.filter(e => { return e.stage < 5 }).length;
    unfinished[1] = SpanishProgress.filter(e => { return e.stage < 5 }).length;
    notStarted[0] = EnglishNotStarted.length;
    notStarted[1] = SpanishNotStarted.length;


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