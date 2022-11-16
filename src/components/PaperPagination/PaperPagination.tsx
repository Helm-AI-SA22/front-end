import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import data from '../../assets/fast_be_fe.json';
import { Button, Chip, Card, CardHeader, CardContent, CardActions } from '@mui/material'
import LaunchIcon from '@mui/icons-material/Launch';


export default function PaperPagination(){
    
    const perPage = 5;
    const totPaper = data.documents.length;
    const countPages = Math.ceil(totPaper / perPage);

    const [page, setPage] = React.useState(1);
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };
    
    const populatePaperPagination = data.documents.slice((page - 1) * perPage, page * perPage)
    const populate = populatePaperPagination.map(function (paper) {
    
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
                    <Box sx={{display: 'flex', flexDirection: 'row'}}>
                        <Typography variant="body1">Associated topics</Typography>
                        {populatetopics}
                    </Box>
                    
                    <Typography variant="body1" sx={{pt:2}}>
                        <Typography variant="body1" sx={{fontWeight:'bold'}}>
                            Abstract
                        </Typography>
                        {paper.abstract}
                        {/** aggiungere un read more button */}
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
                </CardActions>
            </Card>
        )
    });

    

    return(
        <Box>
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
            <Box>
                {populate} 
                {/** .slice((page - 1) * perPage, page * perPage)}*/}
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
            
        </Box>
    );
}

