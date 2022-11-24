import React, {Component, useState} from 'react';
import {Stack, Button, Chip, Card, CardHeader, CardContent, CardActions, Icon } from '@mui/material'
import {Grid, Box, Container, Typography, Pagination} from '@mui/material';
import './ResultsList.css';
import LaunchIcon from '@mui/icons-material/Launch';
import { Paper, SearchAPIResponse, TopicPaperMap } from '../../utility/interfaces';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';
import LockTwoToneIcon from '@mui/icons-material/LockTwoTone';
import arxiv from '../../assets/logo/arxiv.png';
import ieee from '../../assets/logo/ieee.jpeg';
import scopus from '../../assets/logo/scopus.png';
import PageFooter from '../../components/Footer/Footer';
import {useAppSelector, useAppDispatch} from '../../utility/hooks';
import {selectTopicsIndex}  from '../SearchBar/SearchResultsSlice';
import {PaginationState, initPagination, updateCurrentPage} from '../ResultsList/PaginationSlice';
import { RootState } from '../../utility/store';
import { Dispatch } from 'redux';
import {selectCurrentPage, selectDocPerPage, selectTotPapers, selectNPages} from '../../components/ResultsList/PaginationSlice'
import { connect } from 'react-redux';


interface ResultsListHandler {
    documents: Array<Paper>;
    docPerPage: number;
    totPapers: number;
    nPages: number;
    currentPage: number;
}

interface ResultsListProps extends ResultsListHandler{
    initPagination: (updater: Array<Paper>) => void;
    updateCurrentPage: (updater: number) => void;
}

const mapStateToProps = (state: RootState) => ({
    docPerPage: state.pagination.docPerPage,
    totPapers: state.pagination.totPapers,
    nPages: state.pagination.nPages,
    currentPage: state.pagination.currentPage,
    documents: state.results.data.documents
} as PaginationState);



const mapDispatchToProps = (dispatch: Dispatch) => ({
    initPagination: (updater: Array<Paper>) => dispatch(initPagination(updater)),
    updateCurrentPage: (updater: number) => dispatch(updateCurrentPage(updater))
})

const ResultsList = ( props: ResultsListProps) => {

    const dispatch = useAppDispatch();
    
    const {totPapers, docPerPage,  nPages,  currentPage } = props
    dispatch(initPagination(props.documents));
    const [readMore, setReadMore] = useState(props.documents.map( _ => false));
   

    const topicsIndexList = useAppSelector(selectTopicsIndex);

    //const [page, setPage] = React.useState(1);
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        //setPage(value);
        props.updateCurrentPage(value);
    };

    function topicIdToName(paperTopics: TopicPaperMap){
        for(let i=0; i<topicsIndexList.length; i++){
            if(topicsIndexList[i].id == paperTopics.id){
                return topicsIndexList[i].name;
            }
        }
    }
    
    const populatePaperPagination = props.documents.slice((currentPage - 1) * docPerPage, currentPage * docPerPage)
    
    const populate = populatePaperPagination.map(function (paper: Paper, index: number) {
    
        const populatetopics = paper.topics.map((papertopics) => (
            <Chip sx={{ml:1}} size="small" color="primary" variant="outlined"  label={ topicIdToName(papertopics)} 
            id={papertopics['id'].toString()} key={papertopics['id'].toString()}/>
        ));

    
        const populatesources = (paper.source ? paper.source : []).map((papersources) => (
                (papersources =="arxiv") ?  <Box component="img" sx={{height: 20}} alt="source logo" src={arxiv}/>
                : (papersources =="ieee") ? <Box component="img" sx={{height: 20}} alt="source logo" src={ieee}/>
                : <Box component="img" sx={{height: 20}} alt="source logo" src={scopus}/>
            )
        );

        const readAbstract = (abstract: string, index: number) => {
            return (
                <Box>
                    { readMore[index] ? abstract : `${abstract.substring(0, 250)}` }
                    <Button className="btn" variant="text" sx={{fontSize:10}} onClick={() => {
                            const state_copy = [...readMore] as Array<boolean>                            
                            state_copy[index] = !(readMore[index]) 
                            setReadMore([...state_copy])}
                        }>
                        {readMore[index] ? "Show less" : "... Show more"}
                    </Button>
                </Box>
            );
        }

        return(
             <Card sx= {{m:1, p:1,  bgcolor: 'background.paper', borderRadius: 0}} id={paper.id} key={paper.id}>
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
                            <Grid item xs={12}>
                                <Box sx={{display: 'flex', flexDirection: 'row', mt:0.5}}>
                                    <Typography variant="caption" sx={{fontWeight:'bold', mr:1}}> DOI </Typography>
                                    <Typography variant="caption" color="text.secondary"> {paper.id} </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={6}>
                               <Box sx={{display: 'flex', flexDirection: 'row', mt:0.5}}>
                                    <Typography variant="caption" sx={{fontWeight:'bold', mr:1}}> Publication </Typography>
                                    <Typography variant="caption" color="text.secondary"> {paper.publicationDate} </Typography>
                                </Box>     
                            </Grid>
                            {/**<Grid item xs={6}>
                                <Box sx={{display: 'flex', flexDirection: 'row', mt:0.5}}> 
                                    <Typography variant="caption" sx={{fontWeight:'bold', mr:1}}> Availability status</Typography>
                                    { paper.openaccess ?  <LockTwoToneIcon sx={{fontSize:16}} /> : <LockOpenTwoToneIcon sx={{fontSize:16}} /> }
                                    { paper.openaccess ?  <Typography variant="caption">Restricted</Typography> : <Typography variant="caption">Free</Typography> }
                                </Box>
                            </Grid> */}
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
                        {readAbstract(paper.abstract, index)}
                        </Typography>  
                    </Box> 
                    <Box sx={{display: 'flex', flexDirection: 'row', mt:1 }}>
                    <Typography variant="caption" sx={{fontWeight:'bold', mr:1}}> Associated topic </Typography>
                    {populatetopics}
                    </Box>
                </CardContent>

                <CardActions sx= {{pr: 4, pl: 4, pt:1, pb:2, m:0, display:'flex', justifyContent:'space-between'}}>
                    <Box sx={{display: 'flex', flexDirection: 'row', mt:1,  mr:3}}>
                        {populatesources}
                    </Box>
                    <Stack direction="row" spacing={2} sx={{verticalAlign:"middle"}}>
                        { !paper.openaccess ?  <Typography color="error" variant="button"  sx={{fontSize:10}}> <LockTwoToneIcon sx={{fontSize:14}} /> Restricted </Typography> : <Typography color="green"  variant="button"  sx={{fontSize:10}}> <LockOpenTwoToneIcon sx={{fontSize:14}}/> Free</Typography>}
                        <Button variant="outlined" size="small" href={paper.pdfLink} sx={{fontSize:10, ml:1}}>
                            <LaunchIcon color="primary" sx={{pr:1, fontSize:14}}/>
                            Full text
                        </Button>
                    </Stack>
                </CardActions>

            </Card>
        )
    });

    return(
        <Container className="results-list" disableGutters={true}>
            <Box>
                {populate} 
            </Box>
            <Box component="span" sx={{justifyContent: 'center'}}>
                <Pagination
                    sx={{justifyContent: 'center'}}
                    count={nPages}
                    page={currentPage}
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

export default connect(mapStateToProps,mapDispatchToProps)(ResultsList);