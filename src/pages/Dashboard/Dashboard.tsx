import React from 'react';

import './Dashboard.css';

import { Box, IconButton } from '@mui/material';
import Refresher from '@mui/icons-material/RefreshOutlined';
import AppBar from '../../components/AppBar/AppBar';

import RightPanel from '../../components/RightPanel/RightPanel';
import ResultsList from '../../components/ResultsList/ResultsList';
import LeftPanel from '../../components/LeftPanel/LeftPanel';
import RankingBar from '../../components/RankingBar/RankingBar';
import PageFooter from '../../components/Footer/Footer';
import { useAppDispatch } from '../../utility/hooks';
import { useAppSelector } from '../../utility/hooks';
import { useLocation, useParams } from 'react-router-dom';
import { callSearchAPI, SearchResultsState, selectFiltered, selectNoResultsFound, selectResults, selectSearched } from '../../components/SearchBar/SearchResultsSlice';
import { SearchAPIRequest, SearchResults } from '../../utility/interfaces';


const Dashboard = () => {
    const dispatch = useAppDispatch();
    const [ loading, setLoading ] = React.useState(false);

    const { querytext } = useParams();
    const speed_str = useLocation()['pathname'].split('/')[1];

    const results =  useAppSelector(selectResults) as SearchResults;
    const searched =  useAppSelector(selectSearched);
    const isEmpty = useAppSelector(selectNoResultsFound);
    const isFiltered = useAppSelector(selectFiltered);

    const reloadSearch = async () => { 
        setLoading(true);
        console.log(loading);
        await new Promise(res => setTimeout(res, 5000));
        await callSearchAPI({
            keywords: [ querytext ], 
            type: speed_str
        } as SearchAPIRequest, dispatch);

        console.log(loading);
        setLoading(false);
    }

    return (
        <div>
            <AppBar></AppBar>
            <Box sx={{width: '100%', height:'90vh'}}>
                <Box sx={{width: '100%', height: '7vh'}}>
                        <RankingBar>

                        </RankingBar>
                </Box>
                <Box sx={{width: '100%', height: '80vh',  display: 'flex', flexDirection: 'row'} }>
                    <Box sx={{width: '25%', height: '100%'}}>
                        <RightPanel>

                        </RightPanel>
                    </Box>
                    <Box sx={{width: '50%', height: '100%'}}>
                        { !searched || isEmpty ? 
                            <div className='empty-results'>
                                <div>Youy query: " {querytext} " did not produced any result.</div>
                                <IconButton color="primary" aria-label="upload picture" component="label" onClick={reloadSearch}>
                                    <Refresher className='refresher'/>
                                </IconButton>
                                { searched ? <div>Query altready ran.</div> : <div> Query was not actually executed, try running it again.</div>}
                                { isFiltered ? <div>Try removing too restrictive filters, if any.</div> : <div>No filter was applied.</div>}
                            </div>
                            : <ResultsList documents={results.documents} /> 
                        }
                    </Box>
                    <Box sx={{width: '25%', height: '100%'}}>   
                        <LeftPanel>

                        </LeftPanel>
                    </Box>
                </Box>
                <Box sx={{width: '100%'}}>
                    {/**<PageFooter></PageFooter>*/}
                </Box>

            </Box>
        </div>
    );
}

export default Dashboard;