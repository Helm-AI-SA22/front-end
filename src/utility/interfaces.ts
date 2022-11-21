export interface Paper {
    id: string;
    title: string;
    abstract: string;
    publicationDate: string;
    citationCount: number;
    authors: string;
    pdfLink: string;
    openaccess: number;
    source:Array<string>;
    topics: TopicPaperMap[]; 
}

export interface TopicPaperMap{
    id: number;
    affinity: number;
}

export interface TopicIndex{
    id: number;
    name: string;
}

export interface LDAChart{
    ldaPlot?: string;
}

export interface BERTChart{
    topicClustersPlot?: string; 
    hierarchicalClusteringPlot?: string;
    topicsWordsScorePlot?: string;
    topicsSimilarityPlot?: string;
    documentClustersPlot?: string;
}

export interface SearchAPIResponse {
    data: SearchResults;
    error?: APIError
}

export interface SearchResults {
    documents: Paper[];
    topics: TopicIndex[];
    topicVisualization: LDAChart | BERTChart; 
}

export enum TopicModelingAlgorithm { 
    SLOW = 'slow', 
    FAST = 'fast'     
    } 

export interface SearchAPIRequest{
    keywords: string[];
    type: TopicModelingAlgorithm;
}

export interface APIError {
    code?: number;
    message: string;
}

//Interfaces for filtering
export interface Range{
    min: number;
    max: number;
};

export interface FilteringState {
    topic: string[];
    authors: string[];
    date: Range;
    citationCount: Range;
    availability: number;
    preprint: number;
};

export interface FilterStringUpdater{
    filterKey: string;
    text: string;
}

export interface FilterListUpdater {
    filterKey: string;
    element: number;
    remove: boolean;
}

export interface FilterRangeUpdater {
    filterKey: string;
    updateMin: boolean; 
    value: number;
}

export interface FilterValueUpdater {
    filterKey: string;
    value: number | boolean | string;
}

export interface FilteringPanelProps extends FilteringState { 
    updateListFilter: (updater: FilterListUpdater) => void; 
    updateRangeFilter: (updater: FilterRangeUpdater) => void;
    updateStringFilter: (updater: FilterStringUpdater) => void;
    updateValueFilter: (updater: FilterValueUpdater) => void;
}

export interface Criteria {
    topic?: string[];
    authors?: string[];
    date?: Range;
    citationCount?: Range;
    availability?: number;
    preprint?: number;
}

export interface FilterAPIRequest {
    documents: Paper[];
    criteria: Criteria;
}