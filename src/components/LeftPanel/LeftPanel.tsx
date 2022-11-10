import React, {Component } from 'react';
import {Container, Grid} from '@mui/material';
import './LeftPanel.css'

export default class LeftPanel extends Component{
    render() {
        return(
            <Container className="leftPanel" disableGutters={true}>
                <div>Left panel</div>
            </Container>
        )
    }
}