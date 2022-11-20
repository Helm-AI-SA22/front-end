import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RankingCriteria } from '../../utility/interfaces';


export interface Ranking {
    criteria: RankingCriteria; 
    ascending: boolean;
}

const initialState: Ranking = { 
    criteria: RankingCriteria.SIMILARITY,
    ascending: true
}

export const rankingSlice = createSlice({
  name: 'ranking',
  initialState, 
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    	update: (state, action: PayloadAction<Ranking>) => {
        	state.criteria = action.payload.criteria;
    	}
    }
});

export const { update } = rankingSlice.actions;

export default rankingSlice.reducer;

