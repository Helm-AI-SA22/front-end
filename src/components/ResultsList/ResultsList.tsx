import React, {Component, useState} from 'react';
import { Button, Chip, Card, CardHeader, CardContent, CardActions, Icon } from '@mui/material'
import {Grid, Box, Container, Typography, Pagination} from '@mui/material';
import './ResultsList.css';
import LaunchIcon from '@mui/icons-material/Launch';
import { Paper, SearchAPIResponse } from '../../utility/interfaces';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';
import LockTwoToneIcon from '@mui/icons-material/LockTwoTone';
import arxiv from '../../assets/logo/arxiv.png';
import ieee from '../../assets/logo/ieee.jpeg';
import scopus from '../../assets/logo/scopus.png';
import PageFooter from '../../components/Footer/Footer';


interface ResultsListProps {
    documents: Array<Paper>
}

function ReadAbstract (props: string){
    const [readMore, setReadMore] = useState(false);
    return (
        <Box>
            {readMore ? props : `${props.substring(0, 250)}`}
            <Button className="btn" variant="text" sx={{fontSize:10}} onClick={() => setReadMore(!readMore)}>
            {readMore ? "Show less" : "... Show more"}
            </Button>
        </Box>

    );
}

export default function ResultsList( props: ResultsListProps){
    const { documents } = props;
    console.log(documents)
    const perPage = 5;
    const totPaper = documents.length;
    const countPages = Math.ceil(totPaper / perPage);

    const [page, setPage] = React.useState(1);
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };
    
    const populatePaperPagination = documents.slice((page - 1) * perPage, page * perPage)
    
    const populate = populatePaperPagination.map(function (paper: Paper) {
    
        const populatetopics = paper.topics.map(function(papertopics){
            return(
                <Chip sx={{ml:1}} size="small" color="primary" variant="outlined" label={papertopics['id']}></Chip>
            )
        });

    

        const populatesources = (paper.source ? paper.source : []).map(function(papersources){
            return (
                (papersources =="arxiv") ?  <Box component="img" sx={{height: 20}} alt="source logo" src={arxiv}/>
                : (papersources =="ieee") ? <Box component="img" sx={{height: 30}} alt="source logo" src={ieee}/>
                : <Box component="img" sx={{height: 30}} alt="source logo" src={scopus}/>
                )
        });

        return(
             <Card sx= {{m:1, p:1,  bgcolor: 'background.paper', borderRadius: 0}}>
                <CardHeader sx= {{pr: 4, pl: 4, pt:2, pb:0, m:0, fontSize:12}} title={paper.title} />
                <CardContent  sx= {{pr: 4, pl: 4, pt:1, pb:0, m:0}}>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={0}>

                            <Grid item xs={12}>
                                <Box sx={{display: 'flex', flexDirection: 'row', mt:0.5}}>
                                    <Typography variant="caption" sx={{fontWeight:'bold', mr:1}}> Authors </Typography>
                                    <Typography variant="caption" color="text.secondary">{paper.authors}</Typography> 
                                </Box>
                            </Grid>
                            <Grid item xs={6}>
                                <Box sx={{display: 'flex', flexDirection: 'row', mt:0.5}}>
                                    <Typography variant="caption" sx={{fontWeight:'bold', mr:1}}> DOI </Typography>
                                    <Typography variant="caption" color="text.secondary"> {paper.id} </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={6}>
                               <Box sx={{display: 'flex', flexDirection: 'row', mt:0.5}}>
                                    <Typography variant="caption" sx={{fontWeight:'bold', mr:1}}> Pubblication year </Typography>
                                    <Typography variant="caption" color="text.secondary"> {paper.publicationDate} </Typography>
                                </Box>     
                            </Grid>
                            <Grid item xs={6}>
                                <Box sx={{display: 'flex', flexDirection: 'row', mt:0.5}}> 
                                    <Typography variant="caption" sx={{fontWeight:'bold', mr:1}}> Availability status</Typography>
                                    { paper.openaccess ?  <LockTwoToneIcon sx={{fontSize:16}} /> : <LockOpenTwoToneIcon sx={{fontSize:16}} /> }
                                    { paper.openaccess ?  <Typography variant="caption">Restricted</Typography> : <Typography variant="caption">Free</Typography> }
                                </Box>
                            </Grid>
                            <Grid item xs={6}>
                                <Box sx={{display: 'flex', flexDirection: 'row', mt:0.5}}> 
                                <Typography variant="caption" sx={{fontWeight:'bold', mr:1}}> Citation count </Typography>
                                <Typography variant="caption" color="text.secondary"> 
                                {(paper.citationCount != -1) ? paper.citationCount : "Not available"}
                                </Typography>
                                </Box> 

                            </Grid>
                        </Grid>
                    </Box>
                    <Box sx={{mt:1 }}>
                        <Typography variant="caption" sx={{fontWeight:'bold', mr:1}}> Abstract </Typography>
                        <Typography variant="caption" color="text.secondary" align="justify"> 
                        {ReadAbstract(paper.abstract)}
                        </Typography>  
                    </Box> 
                    <Box sx={{display: 'flex', flexDirection: 'row', mt:1 }}>
                    <Typography variant="caption" sx={{fontWeight:'bold', mr:1}}> Associated topic </Typography>
                    {populatetopics}
                    </Box>
                </CardContent>

                <CardActions sx= {{pr: 4, pl: 4, pt:1, pb:2, m:0, display:'flex', justifyContent:'space-between'}}>
                    <Box sx={{display: 'flex', flexDirection: 'row', mt:1}}>
                        {populatesources}
                    </Box>
                    <Button variant="outlined" size="small" href={paper.pdfLink} sx={{fontSize:12}}>
                        <LaunchIcon color="primary" sx={{pr:1, fontSize:16}}/>
                        Full text
                    </Button>
                </CardActions>

            </Card>
        )
    });

    return(
        <Container className="results-list" disableGutters={true}>
            <Box>
                {populate} 
            </Box>
            <Box component="span">
                <Pagination
                    count={countPages}
                    page={page}
                    onChange={handleChange}
                    defaultPage={1}
                    color="primary"
                    size="large"
                    showFirstButton
                    showLastButton
                />
            </Box>   
            <Box sx={{width: '100%'}}>
                <PageFooter></PageFooter>
            </Box> 
        </Container>
    );
}