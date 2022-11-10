import React, {Component } from 'react';
import {Container, Grid} from '@mui/material';
import './ResultsList.css'

export default class ResultsList extends Component{
    render() {
        return(
            <Container className="results-list" disableGutters={true}>
                <div>Results List</div>
            </Container>
        )
    }
}