import axios from 'axios';
import {SearchAPIResponse, SearchAPIRequest, SearchResults, Paper, APIError} from './interfaces';

const SERVER = 'http://localhost:5000';

const search = async (request: SearchAPIRequest) => {
    const ROUTE = '/mock'; // The name of this route can be improved BE side.

    try {
        console.log(`The search API has been called. Query: ${request}`);
        return await axios.post<SearchAPIResponse>(`${SERVER}/${ROUTE}`, request);
    } catch (error) {
		console.log("Erro calling the SEARCH API:", error);
        return {
          	data:{ 
            	documents: [] as Array<Paper>
          	} as SearchResults, 
			error: axios.isAxiosError(error) ? {
				message: error.message,
				code: error.code 
			} : { 
				message: 'An unexpected error occurred'
			} as APIError,
        } as SearchAPIResponse
      }
}


export { search as searchAPI};