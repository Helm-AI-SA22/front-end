import axios from 'axios';
import {SearchAPIResponse, SearchAPIRequest} from './interfaces';

const SERVER = 'http://localhost:5000';

const search = async (request: SearchAPIRequest) => {
    const ROUTE = 'aggregator'; // The name of this route can be improved BE side.

    try {
        // tslint:disable-next-line: no-console
        console.log(`The search API has been called. Query: ${request}`);

        // @TODO Remove "| any" when we will be sure of the response
        return await axios.post<SearchAPIResponse>(`${SERVER}/${ROUTE}`, request);
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