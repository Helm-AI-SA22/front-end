export interface Paper {
    id: string;
    title: string;
    abstract: string;
    publicationDate: string;
    citationCount: number;
    authors: string;
    pdfLink: string;
    openaccess: boolean;
    topics: TopicPaperMap[]; 
}

export interface TopicPaperMap{
    id: string;
    affinity: number;
}

export interface TopicIndex{
    id: string;
    name: string;
}

export interface LDAChart{
    lda_plot?: string;
}

export interface BERTChart{
    topic_clusters_plot: string; 
    hierarchical_clustering_plot: string;
    topics_words_score_plot: string;
    topics_similarity_plot: string;
    document_clusters_plot: string;
}

export interface SearchAPIResponse {
    documents: Paper[];
    topics: TopicIndex[];
    lda_plot: LDAChart;
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