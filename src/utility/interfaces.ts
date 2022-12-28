export interface Paper {
    id: string;
    title: string;
    abstract: string;
    publicationDate: string;
    citationCount: number;
    authors: string;
    pdfLink: string;
    openaccess: number;
    tfidf: number;
    source:Array<string>;
    topics: TopicPaperMap[]; 
}

export interface TopicPaperMap{
    id: number;
    affinity?: number;
}

export interface TopicIndex{
    id: number;
    name: string;
    ratio: number;
    summary: string[];
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
    logs?: string;
    topics: TopicIndex[];
    max_tfidf: number;
    topicsVisualization: LDAChart | BERTChart; 
}

export enum TopicModelingAlgorithm { 
    SLOW = 'slow', 
    FAST = 'fast'     
    } 

export interface SearchAPIRequest{
    keywords: string;
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
    mode: FilterMode;
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
    value: number | boolean | string | FilterMode;
}

export interface FilteringPanelProps extends FilteringState { 
    updateListFilter: (updater: FilterListUpdater) => void; 
    updateRangeFilter: (updater: FilterRangeUpdater) => void;
    updateStringFilter: (updater: FilterStringUpdater) => void;
    updateValueFilter: (updater: FilterValueUpdater) => void;
}

export enum FilterMode { 
    UNION = 'union', 
    INTERSECTION = 'intersection'     
} 

export interface FilterTopic{
    mode: FilterMode;
    topics: string[]; 
}

export interface Criteria {
    topic: FilterTopic | null
    authors: string[] | null;
    date: Range | null;
    citationCount: Range | null;
    availability: number | null;
    preprint: number | null;
}

export interface FilterAPIRequest {
    documents: Paper[];
    criteria: Criteria;
    topics: TopicIndex[];
}

export enum RankingCriteria { 
    SIMILARITY = 'tfidf',
    DATE = 'publicationDate',
    CITATION = 'citationCount'
}

export interface RankingAPIRequest {
    documents: Paper[]
    criteria: RankingCriteria; 
    ascending: boolean;
}

export interface RankingAPIResponse {
    data: {
        documents: Array<Paper>, 
        error?: APIError
    }

}

export interface Person {
    fullName: string;
    description: string;
    image_source: string;
    linkedin_url: string; 
    github_url: string;
}
