import React from 'react';

import './Dashboard.css';

import { Box, CircularProgress, IconButton } from '@mui/material';
import Refresher from '@mui/icons-material/RefreshOutlined';
import AppBar from '../../components/AppBar/AppBar';

import ResultsList from '../../components/ResultsList/ResultsList';
import LeftPanel from '../../components/LeftPanel/LeftPanel';
import RankingBar from '../../components/RankingBar/RankingBar';
import PageFooter from '../../components/Footer/Footer';
import { useAppDispatch } from  '../../utility/hooks';
import { useLocation, useParams } from 'react-router-dom';
import { callSearchAPI, } from '../../components/SearchBar/SearchResultsSlice';
import { BERTChart, LDAChart, SearchAPIRequest, SearchResults } from '../../utility/interfaces';
import { RootState } from '../../utility/store';
import { connect } from 'react-redux';
import FilteringPanel from '../../components/FilteringPanel/FilteringPanel';
import Base64Displayer from '../../components/Base64Displayer/Base64Displayer';

interface DashboardProps { 
    data: SearchResults;
    searched: boolean;
    isFiltered: boolean;
    isEmpty: boolean;
}

const mapStateToProps = (state: RootState) => ({
    data: state.results.data, 
    searched: state.results.searched, 
    isFiltered: state.results.filtered,
    isEmpty:  state.results.searched && !state.results.data.documents.length
} as DashboardProps ) 


const Dashboard = (props: DashboardProps ) => {
    const dispatch = useAppDispatch();
    const [ loading, setLoading ] = React.useState(false);

    const { querytext } = useParams();
    console.log(querytext);
    const speed_str = useLocation()['pathname'].split('/')[1];

    const reloadSearch = async () => { 
        setLoading(true);
        await callSearchAPI({
            keywords: querytext , 
            type: speed_str
        } as SearchAPIRequest, dispatch);
        setLoading(false);
    }

    if (!props.searched && !loading){
        reloadSearch();
    }

    return (
        <div>
            <AppBar></AppBar>
            <Box sx={{width: '100%', height:'90vh'}}>
                <Box sx={{width: '100%', height: '7vh'}}>
                        <RankingBar/>
                </Box>
                <Box sx={{width: '100%', height: '80vh',  display: 'flex', flexDirection: 'row'} }>
                    <Box sx={{width: '25%', height: '100%'}}>
                        <FilteringPanel/>
                    </Box>
                    <Box sx={{width: '50%', height: '100%'}}>
                        { props.searched && !props.isEmpty ? <ResultsList documents={props.data.documents} /> :
                            <div className='empty-results'>
                                <div>Youy query: " {querytext} " did not produced any result.</div>
                                <div className='circle-symbol'>
                                    { loading ? <CircularProgress /> : 
                                        <IconButton color="primary" aria-label="upload picture" component="label" onClick={reloadSearch}>
                                            <Refresher className='refresher'/>
                                        </IconButton>
                                    }
                                </div>
                                { props.searched ? <div>Query altready ran.</div> : <div> Query was not actually executed, try running it again.</div>}
                                { props.isFiltered ? <div>Try removing too restrictive filters, if any.</div> : <div>No filter was applied.</div>}
                            </div>
                        
                        }
                    </Box>
                    <Box sx={{width: '25%', height: '100%'}}>   
                        <Base64Displayer source={ props.data.topicsVisualization ? (props.data.topicsVisualization as LDAChart).ldaPlot : undefined } width={400} height={400} /> 
                    </Box>
                </Box>
                {/**<Box sx={{width: '100%'}}>
                    <PageFooter></PageFooter>
                    </Box>*/}

            </Box>
        </div>
    );
}

export default connect(mapStateToProps)(Dashboard);