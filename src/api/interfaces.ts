export interface Paper {
    id: string;
    title: string;
    abstract: string;
    publicationDate: string;
    citationCount: number;
    authors: string;
    pdfLink: string;
    openaccess: number;
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
    topics: TopicIndex[]
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

export interface APIError{
    code?: number;
    message: string;
}