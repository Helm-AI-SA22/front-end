import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import resultsReducer from '../components/SearchBar/SearchResultsSlice';
import { SearchResults } from './interfaces';

export const store = configureStore({
  reducer: {
    results: resultsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  SearchResults,
  Action<string>
>;
