
import React, {Component } from 'react';
import { Buffer } from 'buffer';
import { useAppSelector } from '../../utility/hooks'; 
import { useLocation } from 'react-router-dom';
import { selectTopicVisualization } from '../SearchBar/SearchResultsSlice';
import parse from 'html-react-parser';
import { Helmet } from 'react-helmet';
import { ChartDisplayer } from '../ChartDisplayer/ChartDisplayer';

import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';

import bertcluster from '../../assets/charts/bertcluster.png';
import berthierachical from '../../assets/charts/berthierachical.png';
import bertsimilarity from '../../assets/charts/bertsimilarity.png';
import bertwords from '../../assets/charts/bertwords.png';
import ldavis from '../../assets/charts/ldavis.png';

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
    '/chart/lda/vis': 'ldaPlot', 
    '/chart/bert/cluster': 'topicClustersPlot',
    '/chart/bert/hierachical': 'hierarchicalClusteringPlot',
    '/chart/bert/words': 'topicsWordsScorePlot',
    '/chart/bert/similarity': 'topicsSimilarityPlot', 
    //'/chart/bert/documents': 'documentClustersPlot'
};

const descSelectorMapping = {
    '/chart/lda/vis': 'ldaPlot', 
    '/chart/bert/cluster': 'topicClustersPlot',
    '/chart/bert/hierachical': 'hierarchicalClusteringPlot',
    '/chart/bert/words': 'topicsWordsScorePlot',
    '/chart/bert/similarity': 'topicsSimilarityPlot', 
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
    /*const path = useLocation()['pathname'];*/
    const path = props.graphpath;
    const topicsVisualization = useAppSelector(selectTopicVisualization);

    const imgAnteprima = (imgSelectorMapping as any)[path];
    const graphTitle = (titleSelectorMapping as any)[path] as string;
    const graphDesc  = (descSelectorMapping as any)[path] as string;

    const chartKey = path ? (plotSelectorMapping as any)[path] as string : 'ldaPlot';
    console.log("questo è key, ", chartKey)
    const chart = chartKey ? (topicsVisualization as any)[chartKey] as string : '';
    const decoded: string =  chart ? Buffer.from(chart, 'base64').toString('utf-8') : '<script id="trimone"></script>' 
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    console.log(decoded)
    console.log("eccolo il mio bbbellix grafico")
    return (
        <Box>
        {/*<Button variant="outlined" onClick={handleClickOpen}>
          Open dialog
        </Button>*/}
        <Box 
        /*onClick={ () => {navigate('/chart/bert/cluster')}} */
        onClick={handleClickOpen}
        component='img' 
        src={imgAnteprima} 
        alt='topicClustersPlot' 
        width='90%' 
        padding='5%'>

        </Box>
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <BootstrapDialogTitle
            id="customized-dialog-title"
            onClose={handleClose}
          >
            {graphTitle}
          </BootstrapDialogTitle>
          <DialogContent dividers>
            <Typography gutterBottom>
                {graphTitle}
              This is a simple graph's description: 
              Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
              dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
              ac consectetur ac, vestibulum at eros.
            </Typography>
            <ChartDisplayer HTMLString={decoded} ></ChartDisplayer>
            <Typography> hello </Typography>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              Save changes
            </Button>
          </DialogActions>
        </BootstrapDialog>
      </Box>

    )
}

export default ChartPanel;

