import { useEffect, useState } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { getClassProgress, getNotStarted, getVocabulary } from '../functions/chartfunctions.js';

let EnglishAll = await getVocabulary("English");
let SpanishAll = await getVocabulary("Spanish");


function ClassChart(props) {

    let learned = [0, 0];
    let unfinished = [0, 0];
    let notStarted = [0, 0];

    const [EnglishProgress, SetEnglishProgress] = useState([]);
    const [SpanishProgress, SetSpanishProgress] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            SetEnglishProgress(await getClassProgress(props.IDClass, "English"));
            SetSpanishProgress(await getClassProgress(props.IDClass, "Spanish"));
        };
        fetchData();
    }, []);

    let EnglishNotStarted = getNotStarted(EnglishAll, EnglishProgress);
    let SpanishNotStarted = getNotStarted(SpanishAll, SpanishProgress);

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