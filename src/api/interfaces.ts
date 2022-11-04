export interface Paper {
    id: string;
    abstract: string;
    keywords: string[];
    authors: string[];
    source: string;
    metadata: string;
    year: number;
    fullText: boolean;
    topicMapping: TopicPaperMap; 
}

export interface Topic{
    idx: string;
    affinity: number;
}

export interface TopicPaperMap{
    id: string;
    topics: Topic;
}

export interface TopicIndex{
    id: string;
    name: string;
}

export interface LDAChart{
    ldaPlot: string;
}

export interface BERTChart{
    topicClustersPlot: string;
    hierarchicalClusteringPlot: string;
    topicsWordsScorePlot: string;
    topicsSimilarityPlot: string;
}

export interface SearchAPIResponse {
    papers: Paper[];
    topicsIndex: TopicIndex[];
    topicVisualization: LDAChart | BERTChart; 
}

export interface Keyword{
    keywords: [];
    type: string;
}