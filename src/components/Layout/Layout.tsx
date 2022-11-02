import React, {Component } from 'react';

import {Container, Grid} from '@mui/material';
import './Layout.css';



export default class Layout extends Component {
    render(){
        return (
            <Container className="frame" maxWidth="lg" disableGutters={true}>
                <Grid container>
                    <Grid item xs={12}>
                        <div className="header">Helm</div>
                    </Grid>
                    <Grid item xs={3}>
                        <div className="right-panel">Ranking</div>
                    </Grid>
                    <Grid item xs={9}>
                        <div className="content">Body</div>
                    </Grid>
                    <Grid item xs={12}>
                        <div className="footer">Footer</div>
                    </Grid>
                </Grid>
            </Container>
          );
    }
}

