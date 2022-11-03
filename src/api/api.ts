import axios from 'axios';

interface Paper {
    id: string;
    abstract: string;
    keywords: string[];
    authors: string[];
    source: string;
    metadata: string;
    year: number;
    fullText: boolean
}

interface SearchAPIResponse {
    papers: Paper[]
}

const SERVER = 'http://localhost/5000';

const search = async (query: string) => {
    const ROUTE = 'Aggregator'; // The name of this route can be improved BE side.

    try {
        // tslint:disable-next-line: no-console
        console.log(`The search API has been called. Query: ${query}`);

        // @TODO Remove "| any" when we will be sure of the response
        return await axios.get<SearchAPIResponse | any>(`${SERVER}/${ROUTE}/${query}`);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // tslint:disable-next-line: no-console
            console.log('error message: ', error.message);

            return error.message;
          } else {
            // tslint:disable-next-line: no-console
            console.log('unexpected error: ', error);

            return 'An unexpected error occurred';
          }
    }
}


export { search as searchAPI};