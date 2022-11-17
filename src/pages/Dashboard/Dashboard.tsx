import React from 'react';

import './Dashboard.css';

import { Box } from '@mui/material'
import AppBar from '../../components/AppBar/AppBar';

import RightPanel from '../../components/RightPanel/RightPanel';
import ResultsList from '../../components/ResultsList/ResultsList';
import LeftPanel from '../../components/LeftPanel/LeftPanel';
import RankingBar from '../../components/RankingBar/RankingBar';
import PageFooter from '../../components/Footer/Footer';

import { useAppSelector } from '../../utility/hooks';
import { useLocation, useParams } from 'react-router-dom';
import { selectDocuments } from '../../components/SearchBar/documentsSlice';

const Dashboard = () => {
    const { querytext } = useParams();
    const speed_str = useLocation()['pathname'].split('/')[1];
    const results =  useAppSelector(selectDocuments).documents as any;

    console.log(speed_str, results, querytext )
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
                        <ResultsList documents={results.documents} />
                        
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