import React from 'react';
import {Box} from '@mui/material';
import './RankingBar.css'

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { rankingAPI } from '../../utility/api';
import { Paper, RankingAPIRequest, RankingAPIResponse, RankingCriteria } from '../../utility/interfaces';
import { useAppDispatch } from '../../utility/hooks';
import { RootState } from '../../utility/store';
import { updateDocuments, rank } from '../SearchBar/SearchResultsSlice';
import { Ranking, updateRanking } from './RankingSlice';
import { connect } from 'react-redux';

const mapStateToProps = (state: RootState) => ({
    documents: state.results.data.documents,
    criteria: state.ranking.criteria, 
    ascending: state.ranking.ascending
})

interface RankingBarProps {
    documents: Array<Paper>;
    criteria: RankingCriteria;
    ascending: boolean;
}

const RankingBar = (props: RankingBarProps ) => {
    const dispatch = useAppDispatch();
    
    
    const handleChange = async (event: SelectChangeEvent) => {
        const ranking = { 
            criteria: event.target.value as RankingCriteria, 
            ascending: false 
        } as Ranking;

        console.log(ranking);
        dispatch(updateRanking(ranking));

        const request = {
            documents: props.documents, 
            ...ranking
        } as RankingAPIRequest;

        const response = await rankingAPI(request) as RankingAPIResponse;
        dispatch(rank());
        dispatch(updateDocuments(response.data.documents))
    };

    return ( 
        <Box className="ranking-bar">
            <div className='formC'>
                <FormControl size='small' sx={{marginLeft: 50,marginTop: 1, minWidth: 130}}>
                    <InputLabel size='small' id="demo-simple-select-autowidth-label" sx={{marginTop:0}}>Order by</InputLabel>
                    <Select sx={{height: '4vh'}}
                        value={props.criteria}
                        onChange={handleChange}
                        autoWidth
                        label="Rank"
                    >
                    <MenuItem sx={{height: '4vh'}} value={RankingCriteria.SIMILARITY}>Query matching</MenuItem>
                    <MenuItem sx={{height: '4vh'}} value={RankingCriteria.DATE}>Publication year</MenuItem>
                    <MenuItem sx={{height: '4vh'}} value={RankingCriteria.CITATION}>Citations</MenuItem>
                    </Select>
                </FormControl>
            </div>
        </Box>
    )
}


export default connect(mapStateToProps)(RankingBar);


