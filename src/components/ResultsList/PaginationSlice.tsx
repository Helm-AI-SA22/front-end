import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../utility/store';
import {Paper} from '../../utility/interfaces'

export interface PaginationState {
    docPerPage: number,
    totPapers: number,
    nPages: number,
    currentPage: number
}

const initialState: PaginationState = {
    docPerPage: 5,
    totPapers: 0,
    nPages: 0,
    currentPage: 1
}

export const paginationSlice = createSlice({
    name: 'paginationInfo',
    initialState,
    reducers:{
        initPagination: (state, action: PayloadAction<Array<Paper>>) => {
            state.totPapers = action.payload.length;
            state.nPages = Math.ceil(state.totPapers / state.docPerPage)
        },
        updateCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        }
    }
});

export const selectCurrentPage = (state: RootState) => state.pagination.currentPage;
export const selectDocPerPage = (state: RootState) => state.pagination.docPerPage;
export const selectTotPapers = (state: RootState) => state.pagination.totPapers;
export const selectNPages = (state: RootState) => state.pagination.nPages;

export const { initPagination, updateCurrentPage} = paginationSlice.actions;

export default paginationSlice.reducer;
