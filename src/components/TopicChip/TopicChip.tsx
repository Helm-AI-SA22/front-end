import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Chip from '@mui/material/Chip';
import { List, ListItem, ListItemText, Tooltip } from '@mui/material';

interface TopiChipProps {
  id: number;
  name: string;
  summary: string[];
  hideName?: boolean;
}

const TopicChip = (props: TopiChipProps) => {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  //const summary = props.id ==  -1 ? [props.summary] : props.summary
  
  return (
    <>
      <Tooltip title="Click here for more information about the topic.">
        <Chip sx={{m:0.5}} size="small" color="primary" variant="outlined"  label={props.hideName ? '?' : props.name } 
                  id={props.id.toString()} key={props.id.toString()} onClick={()=>{ 
                    setOpen(true);
                  }}/>
      </Tooltip>
      <Dialog open={open} onClose={handleClose} 
        BackdropProps={{style: {backgroundColor: '#00000033' }}}
        PaperProps={{
            style: {
            backgroundColor: 'white',
            boxShadow: 'none',
            },
        }}>
        <DialogTitle>{props.name}</DialogTitle>
        <DialogContent>
        Relevant arguments of the topic:
        <List component="div" role="group">
          { props.summary.map( elem => 
            <ListItem divider>
              <ListItemText primary={elem}/>
            </ListItem> )
          }
        </List>
          {/* <DialogContentText>{ props.summary } </DialogContentText> */}
        </DialogContent>
        <DialogActions>
        <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default TopicChip;