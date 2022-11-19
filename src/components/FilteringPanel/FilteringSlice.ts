import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../utility/store';
import { APIError, Paper, SearchAPIRequest, SearchAPIResponse, SearchResults } from '../../utility/interfaces';
import { searchAPI } from '../../utility/api';
import {FilteringState, FilterStringUpdater, FilterListUpdater, FilterRangeUpdater, FilterValueUpdater, Range} from '../../utility/interfaces'
import { CIT_MAX, CIT_MIN, DATE_MAX, DATE_MIN } from '../../utility/constants';

export interface Setter{
    key: string,
    value: any
};

const initialState: FilteringState = {
    topic: [],
    authors: [],
    date: {
        min: DATE_MIN,
        max: DATE_MAX
    },
    citationCount: {
        min: CIT_MIN,
        max: CIT_MAX
    },
    availability: 0
}

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    updateListFilter: (state, action: PayloadAction<FilterListUpdater>) => {
        const {filterKey, element, remove } = action.payload;
        const filterList = (state as any)[filterKey] as Array<any>;
        if (!remove) {
            (state as any)[filterKey] = [...filterList, element];
        } else {
            const idx = filterList.indexOf(element);
            filterList.splice(idx, 1);
            (state as any)[filterKey] = [...filterList];
        }
    },
    updateRangeFilter:  (state, action: PayloadAction<FilterRangeUpdater>) => {
        const {filterKey, updateMin, value} = action.payload;
        const filterRange = (state as any)[filterKey] as Range;
        if(updateMin){
            filterRange.min = value;
        }
        else{
            filterRange.max = value;
        }
    },
    updateStringFilter:  (state, action: PayloadAction<FilterStringUpdater>) => {
        const {filterKey, text} = action.payload;
        (state as any)[filterKey] = [...text.split('\n')];
    },
    updateValueFilter: (state, action: PayloadAction<FilterValueUpdater>) => {
        const {filterKey, value} = action.payload;
        (state as any)[filterKey] = value;
    },
    clean: (state) => {
        state = {...initialState};
    }
  }
});

export const { updateListFilter, updateRangeFilter, updateStringFilter, updateValueFilter, clean } = filtersSlice.actions;

export default filtersSlice.reducer;

