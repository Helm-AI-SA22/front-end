import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../utility/store';
import { Paper, SearchResults } from '../../utility/interfaces';

export interface SearchResultsState {
  results: SearchResults
}

const initialState: SearchResultsState = {
  results: {
    documents: [] as Array<Paper>
  } as SearchResults 
};


export const resultsSlice = createSlice({
  name: 'results',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    update: (state, action: PayloadAction<SearchResults>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.results = action.payload; //@TODO replace with search api results.
    },
    clean: (state) => {
      state.results = { documents: [] as Array<Paper> } as SearchResults;
    }
  }
});

export const { update, clean } = resultsSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectResults = (state: RootState) => state.results;



// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd =
//   (amount: number): AppThunk =>
//   (dispatch, getState) => {
//     const currentValue = selectDocuments(getState());
//     dispatch(incrementByAmount(amount));
//   };

export default resultsSlice.reducer;
