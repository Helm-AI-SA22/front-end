import React, {Component } from 'react';
import {Typography, Divider} from '@mui/material';

import './About.css';

export default class AboutPage extends Component {
    render(){
        return (
            <Typography variant="body1" align="center"  color="text.primary" sx={{pt:4}} paragraph>
            Retrieve the most significant sources for any research field, explore the results and analyze them with intiutive topic-centered visualizations tools.
                    
            </Typography>  
          );
    }
}