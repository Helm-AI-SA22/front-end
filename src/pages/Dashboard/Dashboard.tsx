import React from 'react';

import './Dashboard.css';

import { Box } from '@mui/material'
import AppBar from '../../components/AppBar/AppBar';

import RightPanel from '../../components/RightPanel/RightPanel';
import ResultsList from '../../components/ResultsList/ResultsList';
import LeftPanel from '../../components/LeftPanel/LeftPanel';
import RankingBar from '../../components/RankingBar/RankingBar';
import PageFooter from '../../components/Footer/Footer';

import { useParams } from 'react-router-dom';


const Dashboard = () => {
    const { querytext } = useParams();
    console.log(querytext);

    return (
        <div>
            <AppBar></AppBar>
            <Box sx={{width: '100%', height:'90vh'}}>
                <Box sx={{width: '100%', height: '4vh'}}>
                        <RankingBar>

                        </RankingBar>
                </Box>
                <Box sx={{width: '100%', height: '80vh'}}>
                    <Box sx={{width: '25%', height: '100%', display: 'inline-block'}}>
                        <RightPanel>

                        </RightPanel>
                    </Box>
                    <Box sx={{width: '50%', height: '100%', display: 'inline-block'}}>
                        <ResultsList>

                        </ResultsList>
                    </Box>
                    <Box sx={{width: '25%', height: '100%', display: 'inline-block'}}>   
                        <LeftPanel>

                        </LeftPanel>
                    </Box>
                </Box>
                <Box sx={{width: '100%'}}>
                    <PageFooter></PageFooter>
                </Box>

            </Box>
        </div>
    );
}

export default Dashboard;