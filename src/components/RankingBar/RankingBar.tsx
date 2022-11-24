import React from 'react';
import {Box, FormControlLabel, FormGroup, Switch, Typography} from '@mui/material';
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
import { Stack } from '@mui/system';
import { useParams } from 'react-router-dom';
import { autoBatchEnhancer } from '@reduxjs/toolkit';
import { ForkRight } from '@mui/icons-material';

const mapStateToProps = (state: RootState) => ({
    documents: state.results.data.documents,
    criteria: state.ranking.criteria, 
    ascending: state.ranking.ascending,
    currentPage: state.pagination.currentPage,
    totDocs: state.pagination.totPapers,
    nPages: state.pagination.nPages
})

interface RankingBarProps {
    documents: Array<Paper>;
    criteria: RankingCriteria;
    ascending: boolean;
    currentPage: number;
    totDocs: number;
    nPages: number;
}

const RankingBar = (props: RankingBarProps ) => {
    const dispatch = useAppDispatch();
    const { querytext } = useParams();

    console.log(querytext);

    const handleCriteriaChange = async (event: SelectChangeEvent) => {
        const ranking = { 
            criteria: event.target.value as RankingCriteria, 
            ascending: props.ascending 
        } as Ranking;

        dispatch(updateRanking(ranking));

        const request = {
            documents: props.documents, 
            ...ranking
        } as RankingAPIRequest;

        const response = await rankingAPI(request) as RankingAPIResponse;
        dispatch(rank());
        dispatch(updateDocuments(response.data.documents))
    };

    const handleRankingDirectionhange = async (event: SelectChangeEvent) => {
        const ranking = { 
            criteria:  props.criteria, 
            ascending: !props.ascending 
        } as Ranking;

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
            <div className='textR'>
                <p>{props.currentPage + "-" + props.nPages + " of over " + props.totDocs + " results for " + querytext?.replace(";", " & ")}</p>
            </div>
            <div className='formC'>
                <Stack direction="row" spacing={2}>
                    <FormControl size='small' sx={{marginTop: 1, minWidth: 130}}>
                        <InputLabel size='small' id="demo-simple-select-autowidth-label" sx={{marginTop:0}}>Order by</InputLabel>
                        <Select sx={{height: '4vh'}}
                            value={props.criteria}
                            onChange={handleCriteriaChange}
                            autoWidth
                            label="Ranking Criteria"
                        >
                            <MenuItem sx={{height: '4vh'}} value={RankingCriteria.SIMILARITY}>Query matching</MenuItem>
                            <MenuItem sx={{height: '4vh'}} value={RankingCriteria.DATE}>Publication year</MenuItem>
                            <MenuItem sx={{height: '4vh'}} value={RankingCriteria.CITATION}>Citations</MenuItem>
                        </Select>
                    </FormControl>
                    <FormGroup>
                        <FormControlLabel control={<Switch defaultChecked value={props.ascending} onChange={handleRankingDirectionhange}  />} label="Descending" />
                    </FormGroup>
                </Stack>
            </div>
        </Box>
    )
}


export default connect(mapStateToProps)(RankingBar);


