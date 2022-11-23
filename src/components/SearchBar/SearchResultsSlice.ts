import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../utility/store';
import { APIError, Paper, SearchAPIRequest, SearchAPIResponse, SearchResults, TopicIndex} from '../../utility/interfaces';
import { searchAPI } from '../../utility/api';

export interface SearchResultsState {
  data: SearchResults,
  originalDocuments: Paper[],
  searched: boolean;
  filtered: boolean;
  ranked: boolean; 
  error?: APIError;
}

const initialState: SearchResultsState = {
  data: {
    topics: [] as TopicIndex[],
    max_tfidf: 0,
    documents: [] as Array<Paper>
  } as SearchResults,
  originalDocuments: [],
  searched: false,
  filtered: false,
  ranked: false
};

export const resultsSlice = createSlice({
  name: 'results',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    update: (state, action: PayloadAction<SearchResults>) => {
      if(!state.filtered){
        state.originalDocuments = [...action.payload.documents];
      }
      state.data = action.payload;
      state.searched = true;
    },
    updateDocuments: (state, action: PayloadAction<Array<Paper>>) => { 
      state.data.documents = [...action.payload]
    },
    setError: (state, action: PayloadAction<APIError>) => {
       state.error = { ...action.payload};
    },
    clean: (state) => {
      state.data = { documents: [] as Array<Paper>, max_tfidf:0 } as SearchResults;
      state.searched = false;
      state.filtered = false; 
      state.ranked = false;
    },
    filter: (state) => {
      state.filtered = true;
    },
    rank: (state) => { 
      state.ranked = true; 
    }
  }
});

export const callSearchAPI = async (request: SearchAPIRequest, dispatch: Dispatch) => {
  const response = await searchAPI(request) as SearchAPIResponse; 
  if (response.error) {
    dispatch(setError(response.error as APIError));
  }

  dispatch(update(response.data)); 
}

export const { update, updateDocuments, setError, clean, filter, rank } = resultsSlice.actions;

export const selectResults = (state: RootState) => state.results.data;
export const selectOriginalDocs = (state: RootState) => state.results.originalDocuments;
export const selectErrorState = (state: RootState) => state.results.error;
export const selectSearched = (state: RootState) => state.results.searched;
export const selectFiltered = (state: RootState) => state.results.filtered;
export const selectNoResultsFound = (state: RootState) => state.results.searched && !state.results.data.documents.length;
export const selectTopicsIndex = (state: RootState) => state.results.data.topics;
export const selectMaxTfidf = (state: RootState) => state.results.data.max_tfidf;

export default resultsSlice.reducer;

