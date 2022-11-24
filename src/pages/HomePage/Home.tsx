import React, {Component} from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';

import CssBaseline from '@mui/material/CssBaseline';
import {Container, Box, Toolbar} from '@mui/material';
import {Typography, Divider} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Logo from '../../assets/logo/primary.png';
import Helm from '../../assets/logo/helm.png';

import SearchBar from '../../components/SearchBar/SearchBar';
// import PageFooter from '../../components/Footer/Footer';

const theme = createTheme();


export default class HomePage extends Component {
    render(){
        return (
            <ThemeProvider theme={theme}>
            <CssBaseline />
            {/* Header */}
            {/*<AppBar position="relative">
                <Toolbar>
                <Box
                    component="img"
                    sx={{
                    height: 44,
                    pr:2
                    }}
                    alt="Your logo."
                    src={Logo}
                />
                <Typography variant="h5" color="inherit" noWrap  sx={{fontWeight: 'bold'}}>
                    Helm
                </Typography>
                </Toolbar>
            </AppBar>*/}
            
            {/* Body */}
            <main>
                {/* Helm desctiption */}
                <Box sx={{bgcolor: 'background.paper', pt: 8, pb: 2}}>
                {/*<Container maxWidth="md">
                    
                </Container>*/}
                <Container maxWidth="sm" sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <Box
                        component="img"
                        sx={{
                        height: 200,
                       
                        }}
                        alt="Your logo."
                        src={Logo}
                    />
                    {/**<Box
                        component="img"
                        sx={{
                        height: 50,
                        
                        }}
                        alt="Helm.ai"
                        src={Helm}
                    />*/}
                    <Typography  variant="h1" align="center"  color="#171f5b" sx={{fontWeight: 'bold', fontFamily: 'Helvetica', minWidth: '35%', marginTop: 5}} paragraph>
                    {'Helm.ai'}
                    </Typography>   
                    <Typography  variant="h5" align="center"  color="text.secondary" sx={{fontWeight: 'bold', minWidth: '40%', marginTop: 1}} paragraph>
                    {'Navigate through research oceans'} <br />
                        <Button sx={{pt:2}} variant="text" >Read more about us</Button>
                    </Typography>   
                </Container>
                </Box>

                <Box sx={{bgcolor: 'background.paper', pt: 2, pb: 3}}>
                <Container sx={{py: 0}} maxWidth="md">
                    {/*<Divider />
                    <Typography variant="subtitle1" align="left" color="text.secondary" sx={{ ml:15, fontWeight: 'bold', pt:5, pb:1}} paragraph>
                    Choose your interest and start exploring
                    </Typography>*/}
                    <SearchBar />
                </Container>
                </Box>
            </main>

            {/* <PageFooter /> */}

            </ThemeProvider>
  );
}}