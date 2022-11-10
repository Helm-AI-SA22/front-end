import React, {Component } from 'react';

import {Container, Box} from '@mui/material';
import './Layout.css';
import RightPanel from '../RightPanel/RightPanel';
import ResultsList from '../ResultsList/ResultsList';
import LeftPanel from '../LeftPanel/LeftPanel';
import RankingBar from '../RankingBar/RankingBar';
import PageFooter from '../Footer/Footer';

export default class Layout extends Component{
    render(){
        return(
            <Box sx={{width: '100%'}}>
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
        );
    }
}