
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
    '/chart/lda/vis': 'ldaPlot', 
    '/chart/bert/cluster': 'topicClustersPlot',
    '/chart/bert/hierachical': 'hierarchicalClusteringPlot',
    '/chart/bert/words': 'topicsWordsScorePlot',
    '/chart/bert/similarity': 'topicsSimilarityPlot', 
    //'/chart/bert/documents': 'documentClustersPlot'
};

const descSelectorMapping = {
    '/chart/lda/vis': 'In recent years, deep learning poses a deep technical revolution in almost every field and attracts great attentions from industry and academia. Especially, the convolutional neural network (CNN), one representative model of deep learning, achieves great successes in computer vision and natural language processing. However, simply or blindly applying CNN to the other fields results in lower training effects or makes it quite difficult to adjust the model parameters. In this poster, we propose a general methodology named V-CNN by introducing data visualizing for CNN. V-CNN introduces a data visualization model prior to CNN modeling to make sure the data after processing is fit for the features of images as well as CNN modeling. We apply V-CNN to the network intrusion detection problem based on a famous practical dataset: AWID. Simulation results confirm V-CNN significantly outperforms other studies and the recall rate of each invasion category is more than 99.8%.', 
    '/chart/bert/cluster': 'In recent years, deep learning poses a deep technical revolution in almost every field and attracts great attentions from industry and academia. Especially, the convolutional neural network (CNN), one representative model of deep learning, achieves great successes in computer vision and natural language processing. However, simply or blindly applying CNN to the other fields results in lower training effects or makes it quite difficult to adjust the model parameters. In this poster, we propose a general methodology named V-CNN by introducing data visualizing for CNN. V-CNN introduces a data visualization model prior to CNN modeling to make sure the data after processing is fit for the features of images as well as CNN modeling. We apply V-CNN to the network intrusion detection problem based on a famous practical dataset: AWID. Simulation results confirm V-CNN significantly outperforms other studies and the recall rate of each invasion category is more than 99.8%.',
    '/chart/bert/hierachical': 'In recent years, deep learning poses a deep technical revolution in almost every field and attracts great attentions from industry and academia. Especially, the convolutional neural network (CNN), one representative model of deep learning, achieves great successes in computer vision and natural language processing. However, simply or blindly applying CNN to the other fields results in lower training effects or makes it quite difficult to adjust the model parameters. In this poster, we propose a general methodology named V-CNN by introducing data visualizing for CNN. V-CNN introduces a data visualization model prior to CNN modeling to make sure the data after processing is fit for the features of images as well as CNN modeling. We apply V-CNN to the network intrusion detection problem based on a famous practical dataset: AWID. Simulation results confirm V-CNN significantly outperforms other studies and the recall rate of each invasion category is more than 99.8%.',
    '/chart/bert/words': 'In recent years, deep learning poses a deep technical revolution in almost every field and attracts great attentions from industry and academia. Especially, the convolutional neural network (CNN), one representative model of deep learning, achieves great successes in computer vision and natural language processing. However, simply or blindly applying CNN to the other fields results in lower training effects or makes it quite difficult to adjust the model parameters. In this poster, we propose a general methodology named V-CNN by introducing data visualizing for CNN. V-CNN introduces a data visualization model prior to CNN modeling to make sure the data after processing is fit for the features of images as well as CNN modeling. We apply V-CNN to the network intrusion detection problem based on a famous practical dataset: AWID. Simulation results confirm V-CNN significantly outperforms other studies and the recall rate of each invasion category is more than 99.8%.',
    '/chart/bert/similarity': 'In recent years, deep learning poses a deep technical revolution in almost every field and attracts great attentions from industry and academia. Especially, the convolutional neural network (CNN), one representative model of deep learning, achieves great successes in computer vision and natural language processing. However, simply or blindly applying CNN to the other fields results in lower training effects or makes it quite difficult to adjust the model parameters. In this poster, we propose a general methodology named V-CNN by introducing data visualizing for CNN. V-CNN introduces a data visualization model prior to CNN modeling to make sure the data after processing is fit for the features of images as well as CNN modeling. We apply V-CNN to the network intrusion detection problem based on a famous practical dataset: AWID. Simulation results confirm V-CNN significantly outperforms other studies and the recall rate of each invasion category is more than 99.8%.', 
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
    const graphDesc  = (descSelectorMapping as any)[path] as string;
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
                
                <DialogContentText>{graphDesc}</DialogContentText>
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

