import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import {FilteringState, FilterStringUpdater, FilterListUpdater, FilterRangeUpdater, FilterValueUpdater, Range, Criteria} from '../../utility/interfaces'
import { CIT_MAX, CIT_MIN, DATE_MAX, DATE_MIN } from '../../utility/constants';
import { RootState } from '../../utility/store';

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
    availability: -1,
    preprint: -1,
    sources: []
}

export function criteriaToAPI(state: FilteringState): Criteria {
    
    const rangeToAPI = (range: Range, min: number, max: number): Range | null => {

        
        if(range.min == min && range.max == max){
            return null;
        }
        const newRange = {...range};
        if(newRange.min == min){
            newRange.min = -1;
        }
        if(newRange.max == max){
            newRange.max = -1;
        }

        return newRange;
        
    }  

    return {
        topic: (state.topic.length) ? state.topic : null,
        authors: (state.authors.length) ? state.authors : null,
        availability: (state.availability != -1) ? state.availability : null,
        date: (rangeToAPI(state.date, DATE_MIN, DATE_MAX)),
        citationCount: (rangeToAPI(state.citationCount, CIT_MIN, CIT_MAX)),
        preprint: null,
        sources: (state.sources.length) ? state.sources: null
    }
    //nel caso impostare min numCitazioni a 0 se min numCitazioni non indicato e preprint non volute
};

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
        state.topic = [...initialState.topic];
        state.authors = [...initialState.authors];
        state.date = {...initialState.date};
        state.citationCount = {...initialState.citationCount};
        state.availability = initialState.availability;
        state.sources = [...initialState.sources];
    }
  }
});

export const selectAvailability = (state: RootState) => state.filters.availability;

export const { updateListFilter, updateRangeFilter, updateStringFilter, updateValueFilter, clean } = filtersSlice.actions;

export default filtersSlice.reducer;

