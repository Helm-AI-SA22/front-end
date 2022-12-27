
import React, {Component } from 'react';
import './ChartPanel.css'
import { Buffer } from 'buffer';
import { useAppSelector } from '../../utility/hooks'; 
import { useLocation } from 'react-router-dom';
import { selectTopicVisualization } from '../SearchBar/SearchResultsSlice';
import parse from 'html-react-parser';
import { Helmet } from 'react-helmet';
import { ChartDisplayer } from '../ChartDisplayer/ChartDisplayer';
import DialogContentText from '@mui/material/DialogContentText';

import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Dialog, { DialogProps } from '@mui/material/Dialog';

import bertcluster from '../../assets/charts/bertcluster.png';
import berthierachical from '../../assets/charts/berthierachical.png';
import bertsimilarity from '../../assets/charts/bertsimilarity.png';
import bertwords from '../../assets/charts/bertwords.png';
import ldavis from '../../assets/charts/ldavis.png';
import { Chip } from '@mui/material';

const plotSelectorMapping = {
    '/chart/lda/vis': 'ldaPlot', 
    '/chart/bert/cluster': 'topicClustersPlot',
    '/chart/bert/hierachical': 'hierarchicalClusteringPlot',
    '/chart/bert/words': 'topicsWordsScorePlot',
    '/chart/bert/similarity': 'topicsSimilarityPlot', 
    //'/chart/bert/documents': 'documentClustersPlot'
};

const imgSelectorMapping = {
    '/chart/lda/vis': ldavis, 
    '/chart/bert/cluster': bertcluster,
    '/chart/bert/hierachical': berthierachical,
    '/chart/bert/words': bertwords,
    '/chart/bert/similarity': bertsimilarity, 
    //'/chart/bert/documents': 'documentClustersPlot'
};

const titleSelectorMapping = {
    '/chart/lda/vis': 'LDAvis', 
    '/chart/bert/cluster': 'Intertopic distance map',
    '/chart/bert/hierachical': 'Hierarchical clustering',
    '/chart/bert/words': 'Topic word scores',
    '/chart/bert/similarity': 'Topic similarity matrix', 
    //'/chart/bert/documents': 'documentClustersPlot'
};

const descSelectorMapping = {
    '/chart/lda/vis': 'This plot is made up of two parts: on the left is the inter-topic distance map, a visualization in 2D space of the topics found. Each circle represents a topic, and the area is proportional to how many words in the dictionary belong to the topic. The distance between different topics is indicative of how many words are shared between them, being closer the more words they have in common. On the right is a bar chart that by default shows the 30 most salient terms, with the bar representing their frequency across the entire corpus. The saliency, defined on the bottom, is a metric that represents how much a term is informative and useful in finding topics in the considered collection of documents. When a topic is selected, instead, the 30 most relevant words to that topic are shown, and red bars are overlayed over the existing ones to show the term frequency in the selected topic. A parameter, lambda, can be set, and is a weight for how the relevance of a term is computed. Increasing the value towards 1 gives more importance to the probability of the term appearing in the topic, while going towards 0 tends to decrease the relevance of globally frequent terms, potentially leading to a better interpretation of the topic, provided a good value of lambda is found. The formula for this score is once again on the bottom. \n\n Plot interaction: Topics can be selected with either the menu on the top left corner or by clicking on the corresponding circle. The lambda parameter can be set using the slider on the top right corner.',
    '/chart/bert/cluster': 'This plot is a visualization in 2D space of the topics found. Each circle represents a topic, and the area is proportional to how many words in the dictionary belong to the topic. The distance between different topics is indicative of how many words are shared between them, being closer the more words they have in common.',
    '/chart/bert/hierachical': 'This plot shows the hierarchical structure of the topics found. On the left side are the topic numbers with the three most relevant words for each. The x-axis show the euclidean distance between the topic-cluster. This plot is useful to see which topics could possibly be merged because of their similarity, and can help in choosing how to filter documents.',
    '/chart/bert/words': 'This plot shows how similar topics are between one another. The similarity between two specific topics is found by looking for the square where two topics meet (a topic always has max similarity with itself). The darker a square is the more similar the two corresponding topics on those axes are, as shown in the key on the right. Values for this score go from 0 to 1, though the key starts from the minimum value found on the plot.',
    '/chart/bert/similarity': 'This plot shows bar charts based on the scores of the top scoring words for each topic. The numbers on the bottom of every bar chart are the scores. This plot is useful to see how relevant each top word actually is to a topic and to compare between different topics, for example if a word appears in multiple topics.'
    //'/chart/bert/documents': 'documentClustersPlot'
};

const descSelectorMappingInteraction = {
  '/chart/lda/vis': 'Topics can be selected with either the menu on the top left corner or by clicking on the corresponding circle. The lambda parameter can be set using the slider on the top right corner.',
  '/chart/bert/cluster': 'You can use the slider to select a topic, lighting it up in red. If you hover over a topic, then information about it is visualized, namely the most relevant words to that topic and how many documents belong to it (called size in this plot).On the top right corner you can find some general useful functions, for example zoom and pan, and even a way to download the plot in its current state in PNG format.', 
  '/chart/bert/hierachical': 'On the top right corner you can find some general useful functions, for example zoom and pan, and even a way to download the plot in its current state in PNG format.',
  '/chart/bert/words': 'You can hover over every square to see the exact score and the topics it refers to. On the top right corner you can find some general useful functions, for example zoom and pan, and even a way to download the plot in its current state in PNG format.',
  '/chart/bert/similarity': ' You can hover over every bar to see the exact score for the corresponding word.On the top right corner you can find some general useful functions, for example zoom and pan, and even a way to download the plot in its current state in PNG format.'
  //'/chart/bert/documents': 'documentClustersPlot'
};


export interface ChartPageProps { 
    graphpath: string;
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));
  
  export interface DialogTitleProps {
    id: string;
    children?: React.ReactNode;
    onClose: () => void;
  }
  
  function BootstrapDialogTitle(props: DialogTitleProps) {
    const { children, onClose, ...other } = props;
  
    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  }
  
  const ChartPanel = (props: ChartPageProps) => {

    const path = props.graphpath;
    const topicsVisualization = useAppSelector(selectTopicVisualization);
    const imgAnteprima = (imgSelectorMapping as any)[path];
    const graphTitle = (titleSelectorMapping as any)[path] as string;
    const graphDesc1  = (descSelectorMapping as any)[path] as string;
    const graphDesc2  = (descSelectorMappingInteraction as any)[path] as string;
    const chartKey = path ? (plotSelectorMapping as any)[path] as string : 'ldaPlot';
    const chart = chartKey ? (topicsVisualization as any)[chartKey] as string : '';
    const decoded: string =  chart ? Buffer.from(chart, 'base64').toString('utf-8') : '<script id="trimone"></script>' 
    
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => { setOpen(true); };
    const handleClose = () => { setOpen(false); };
    const [fullWidth] = React.useState(true);
    const [maxWidth] = React.useState<DialogProps['maxWidth']>('lg');

    return (
      
        <Box className='box-container'>
          
          <Box 
          onClick={handleClickOpen}
          component='img' 
          src={imgAnteprima} 
          alt='topicClustersPlot' 
          sx = {{cursor: 'pointer'}}
          className = 'box-img'
          width='90%' 
          padding='5%'>
          </Box>
        
          <Dialog
          fullWidth={fullWidth}
          maxWidth={maxWidth}
          open={open}
          onClose={handleClose}
          >
            <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
              {graphTitle}
            </BootstrapDialogTitle>
            <DialogContent dividers>
              <Box sx = {{display: 'flex', flexDirection: 'column'}}>
                
                <DialogContentText><Typography paragraph sx={{fontWeight:'bold', marginTop:1}} > Plot explanation </Typography>{graphDesc1}</DialogContentText>
                <DialogContentText><Typography paragraph sx={{fontWeight:'bold', marginTop:3}}> Plot interaction </Typography>{graphDesc2}</DialogContentText>
                <ChartDisplayer HTMLString={decoded} ></ChartDisplayer>
                </Box>
            </DialogContent>
          </Dialog>

          <Box className='box-middle' onClick={handleClickOpen} sx={{display: 'flex', flexDirection: 'row', justifyContent:'center', alignItems:'center'}}>
            <Chip label='Show interactive chart' sx={{color: 'white', backgroundColor: 'rgb(41, 121, 255)', maxWidth:'50%', cursor:'pointer', opacity:1}}></Chip>
          </Box>


        </Box>

                
      

    )
}

export default ChartPanel;

