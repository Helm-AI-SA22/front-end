import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RankingCriteria } from '../../utility/interfaces';


export interface Ranking {
    criteria: RankingCriteria; 
    ascending: boolean;
}

const initialState: Ranking = { 
    criteria: RankingCriteria.DATE,
    ascending: true
}

export const rankingSlice = createSlice({
  name: 'ranking',
  initialState, 
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    	updateRanking: (state, action: PayloadAction<Ranking>) => {
        	state.criteria = action.payload.criteria;
            state.ascending = action.payload.ascending;

    	}
    }
});

export const { updateRanking } = rankingSlice.actions;

export default rankingSlice.reducer;

