import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
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