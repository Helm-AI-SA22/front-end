import React, {Component, useState} from 'react';
import Box from '@mui/material/Box';
import {CardContent, Container,  Typography} from '@mui/material';
import {Card, CardHeader, CardActions, Button, Chip} from '@mui/material';
import './ResultsList.css';
import LaunchIcon from '@mui/icons-material/Launch';

import PaperPagination from '../PaperPagination/PaperPagination';
import { Paper, SearchAPIResponse } from '../../utility/interfaces';

{/** 
const populate = data.documents.map(function (paper) {
    
    const populatetopics = paper.topics.map(function(papertopics){
        return(
            <Chip sx={{ml:1}} size="small" color="primary" variant="outlined" label={papertopics['id']}></Chip>
        )
    });

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
                    {/** aggiungere un grid per posizionare meglio i vari attributi 
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
                <Box sx={{display: 'flex', flexDirection: 'row'}}>
                    <Typography variant="body1">Associated topics</Typography>
                    {populatetopics}
                </Box>
                
                <Typography variant="body1" sx={{pt:2}}>
                    <Typography variant="body1" sx={{fontWeight:'bold'}}>
                        Abstract
                    </Typography>
                    {paper.abstract}
                    {/** aggiungere un read more button 
                </Typography>

                
            </CardContent>

            
            <CardActions sx= {{pr: 4, pl: 4, pt:1, pb:2, m:0}}>
                <Button variant="outlined" size="small" href={paper["pdf-link"]}>
                    <LaunchIcon color="primary" sx={{pr:1}}/>
                    Full text
                </Button>
                <Button variant="outlined" size="small" href={paper["pdf-link"]}>
                    <LaunchIcon color="primary" sx={{pr:1}}/>
                    Read abstract
                </Button>
                
                {/** <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
                >
                <ExpandMoreIcon />
                </ExpandMore> 
                
            </CardActions>
                    
            {/** 
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <Typography paragraph>
                    Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
                    medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
                    occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
                    large plate and set aside, leaving chicken and chorizo in the pan. Add
                    pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
                    stirring often until thickened and fragrant, about 10 minutes. Add
                    saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
                </Typography>
            </Collapse>
            
        
        </Card>
    )
});
*/}

interface ResultsListProps {
    documents: Array<Paper>
}

export default function ResultsList(props: ResultsListProps ) { 
        return(
            <Container className="results-list" disableGutters={true}>
                <PaperPagination documents= {props.documents} ></PaperPagination>
            </Container>
        )
    }
