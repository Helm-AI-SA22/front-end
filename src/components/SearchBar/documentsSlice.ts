import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../utility/store';
import { Paper } from '../../utility/interfaces';

export interface DocumentsState {
  documents: Array<Paper>
}

const initialState: DocumentsState = {
  documents: []
};


export const documentsSlice = createSlice({
  name: 'documents',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    update: (state, action: PayloadAction<Array<Paper>>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.documents = action.payload; //@TODO replace with search api results.
    },
    clean: (state) => {
      state.documents = [];
    }
  }
});

export const { update, clean } = documentsSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectDocuments = (state: RootState) => state.documents;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd =
//   (amount: number): AppThunk =>
//   (dispatch, getState) => {
//     const currentValue = selectDocuments(getState());
//     dispatch(incrementByAmount(amount));
//   };

export default documentsSlice.reducer;
