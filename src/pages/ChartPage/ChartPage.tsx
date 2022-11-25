import React, {Component } from 'react';
import { Buffer } from 'buffer';
import { useAppSelector } from '../../utility/hooks'; 
import { useLocation } from 'react-router-dom';
import { selectTopicVisualization } from '../../components/SearchBar/SearchResultsSlice';
import parse from 'html-react-parser';
import { Helmet } from 'react-helmet';
import { ChartDisplayer } from '../../components/ChartDisplayer/ChartDisplayer';



const plotSelectorMapping = {
    '/chart/lda/vis': 'ldaPlot', 
    '/chart/bert/cluster': 'topicClustersPlot',
    '/chart/bert/hierachical': 'hierarchicalClusteringPlot',
    '/chart/bert/words': 'topicsWordsScorePlot',
    '/chart/bert/similarity': 'topicsSimilarityPlot', 
    //'/chart/bert/documents': 'documentClustersPlot'
};



interface ChartPageProps { 

}

const ChartPage = (props: ChartPageProps) => {
    const path = useLocation()['pathname'];
    const topicsVisualization = useAppSelector(selectTopicVisualization);

    const chartKey = path ? (plotSelectorMapping as any)[path] as string : 'ldaPlot';

    const chart = chartKey ? (topicsVisualization as any)[chartKey] as string : '';
    const decoded: string =  chart ? Buffer.from(chart, 'base64').toString('utf-8') : '<script id="trimone"></script>' 

    console.log(decoded)
    return (
        <>
            <ChartDisplayer HTMLString={decoded} ></ChartDisplayer>
                
        </>
    )
}

export default ChartPage;