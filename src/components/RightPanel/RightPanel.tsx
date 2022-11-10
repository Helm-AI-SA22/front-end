import React, {Component } from 'react';
import {Container, Grid} from '@mui/material';
import './RightPanel.css'

export default class RightPanel extends Component{
    render() {
        return(
            <Container className="right-panel" disableGutters={true}>
                    <div>Right panel</div>
            </Container>
        )
    }
}