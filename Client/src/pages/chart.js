import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { Paper } from "@mui/material";
import { getNotStarted, getProgressPerUser, getVocabulary } from '../functions/chartfunctions.js';

let learned = [0, 0];
let unfinished = [0, 0];
let notStarted = [0, 0];

let EnglishProgress = await getProgressPerUser("English");
let SpanishProgress = await getProgressPerUser("Spanish");
let EnglishAll = await getVocabulary("English");
let SpanishAll = await getVocabulary("Spanish");

let EnglishNotStarted = getNotStarted(EnglishAll, EnglishProgress);
let SpanishNotStarted = getNotStarted(SpanishAll, SpanishProgress);

learned[0] = EnglishProgress.filter(e => { return e.stage >= 5 }).length;
learned[1] = SpanishProgress.filter(e => { return e.stage >= 5 }).length;
unfinished[0] = EnglishProgress.filter(e => { return e.stage < 5 }).length;
unfinished[1] = SpanishProgress.filter(e => { return e.stage < 5 }).length;
notStarted[0] = EnglishNotStarted.length;
notStarted[1] = SpanishNotStarted.length;


const Chart = () => {
    return (<>
        <Paper className="paperBackground" elevation={1}>
            <BarChart
                series={[
                    { data: learned, label: "Gelernt" },
                    { data: unfinished, label: "Angefangen" },
                    { data: notStarted, label: "Ausstehend" },
                ]}
                height={300}
                xAxis={[{ data: ["Englisch", "Spanisch"], scaleType: 'band', barGapRatio: .5 }]}
                margin={{ top: 50, bottom: 30, left: 40, right: 10 }}
            />
        </Paper>
    </>);
}

export default Chart;