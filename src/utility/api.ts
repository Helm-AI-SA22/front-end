import axios from 'axios';
import {SearchAPIResponse, SearchAPIRequest, SearchResults, Paper, APIError, FilterAPIRequest, RankingAPIRequest, RankingAPIResponse} from './interfaces';

const SERVER = 'http://localhost:5000';

const search = async (request: SearchAPIRequest) => {
    const ROUTE = '/aggregator'; // The name of this route can be improved BE side.

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

const filter = async (request: FilterAPIRequest) => {
	const ROUTE = '/filtering';

	try {
        console.log(`The filtering API has been called. Query: ${request}`);
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

const ranking = async (request: RankingAPIRequest) =>  {
	const ROUTE = '/ranking'; 

	try {
        console.log(`The ranking API has been called. Query:`, request);
        return await axios.post<RankingAPIRequest>(`${SERVER}/${ROUTE}`, request);
	} catch (error) {
		console.log("Erro calling the RANKING API:", error);
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
        } as RankingAPIResponse
      }
	}


export { search as searchAPI};
export { filter as filterAPI};
export { ranking as rankingAPI};