import React, {Component} from 'react';
import Box from '@mui/material/Box';
import {CardContent, Container,  Typography} from '@mui/material';
import {Card, CardHeader, CardActions, Button} from '@mui/material';
import './ResultsList.css'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import { styled } from '@mui/material/styles';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LaunchIcon from '@mui/icons-material/Launch';


/** Add mock json in appropriate directory per fare funzionare il tutto*/
import data from '../../assets/fast_be_fe.json';

const populate = data.documents.map(function (paper) {
    return(
         <Card sx= {{m:1, p:1,  bgcolor: 'background.paper', borderRadius: 1}}>

            <CardHeader sx= {{pr: 4, pl: 4, pt:2, pb:0, m:0}} title={paper.title} />

            <CardContent  sx= {{pr: 4, pl: 4, pt:1, pb:0, m:0}}>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        flexDirection: 'column',
                    }}
                >
                    {/** aggiungere un grid per posizionare meglio i vari attributi */}
                    <Typography variant="caption" color="text.secondary"> 
                        <Typography variant="caption" sx={{fontWeight:'bold'}}> Authors: </Typography>
                        {paper.autors}
                    </Typography>
                    <Typography variant="caption" color="text.secondary"> 
                        <Typography variant="caption" sx={{fontWeight:'bold'}}> DOI: </Typography>
                        {paper.id}
                    </Typography>
                    <Typography variant="caption" color="text.secondary"> 
                        <Typography variant="caption" sx={{fontWeight:'bold'}}> Year: </Typography>
                        {paper["publication-year"]}
                    </Typography>
                    <Typography variant="caption" color="text.secondary"> 
                        <Typography variant="caption" sx={{fontWeight:'bold'}}> Cited by: </Typography>
                        {paper["citation-count"]}
                    </Typography>
                
                </Box>
                
                <Typography variant="body1" sx={{pt:2}}>
                    <Typography variant="body1" sx={{fontWeight:'bold'}}>Abstract</Typography>
                        {paper.abstract}
                        {/** aggiungere un read more button */}
                </Typography>
                
            </CardContent>

            
            <CardActions sx= {{pr: 4, pl: 4, pt:1, pb:2, m:0}}>
                <Button variant="outlined" size="small" href={paper["pdf-link"]}>
                    <LaunchIcon color="primary" sx={{pr:1}}/>
                    Full text
                    </Button>
                <Typography variant="caption">
                    aggiungere topics
                </Typography>
            </CardActions>
        
        </Card>
    )
});

export default function ResultsList() { 
        return(
            <Container className="results-list" disableGutters={true}>
                {populate}
            </Container>
        )
    }
