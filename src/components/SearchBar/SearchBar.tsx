import React from 'react';
import './SearchBar.css';

import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../utility/hooks';
import {Autocomplete, TextField, Button, Chip} from '@mui/material';
import { Search } from '@mui/icons-material' 
import Switch from '@mui/material/Switch';
import InfoIcon from '@mui/icons-material/Info';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';

import { searchAPI } from '../../utility/api';
import { Paper, TopicModelingAlgorithm } from '../../utility/interfaces';
import  suggestions  from '../../assets/suggestions.json';
import Fade from '@mui/material/Fade'
import LinearProgress from '@mui/material/LinearProgress';
import { update } from './documentsSlice';

const SearcBar = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [value, setValue] = React.useState<string[]>([]);
    const [inputValue, setInputValue] = React.useState('');
    const [checked, setChecked] = React.useState(false);
    const [ loading, setLoading ] = React.useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setChecked(event.target.checked);
    };

    const startLoading = (l:boolean) => {
      setLoading(!loading);
    };
   /** const handleWaiting = setLoading((prevLoading) => !prevLoading);**/
   /** const handleWaiting = (event: React.ChangeEvent<HTMLInputElement>) => {
      /**setLoading(event.target.loading);
    };**/
    
      return (
        <div>
          <div className="search-bar">
              <Autocomplete
                  multiple
                  value={value}
                  onChange={(_, newValue) => {
                    setValue(newValue)
                  }}
                  defaultValue={[]} 
                  inputValue={inputValue}
                  onInputChange={(_, newInputValue) => {
                    setInputValue(newInputValue);
                  }}

                  freeSolo={true}
                  disablePortal
                  className='search-autocomplete'
                  options={suggestions}
                  sx={{ width: 500 }}
                  renderInput={(params) => <TextField {...params} variant="filled" label="Research Topic" placeholder="Bibliometry"/>}
                  renderTags={(value: readonly string[], getTagProps) =>
                    value.map((option: string, index: number) => (
                      <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                    ))
                  }
              />
              <Button variant="contained" endIcon={<Search />} className="search-button" onClick={ async () => {
                console.log(value)
                startLoading(false);
               
                /**handleWaiting**/
                if(value.length){
                  const speed = checked ? TopicModelingAlgorithm.FAST : TopicModelingAlgorithm.SLOW;
                  /**alert(`You are searching: ${value.map((kw => kw + ' '))}.  Research type: ${speed}.`);*/
                  const documents = await searchAPI({
                    keywords: value, 
                    type: speed
                  });
                   
                  dispatch(update(documents as any))
                  startLoading(true);
                  console.log(loading);
                  navigate(`/${speed}/${value[0]}`)
                }
              }}>
                  Search
              </Button>
          </div>
          <Box sx={{pt:1, pl:15, pb:4}} className= "switch-container" >
            <Switch
              checked={checked}
              onChange={handleChange}
              inputProps={{ 'aria-label': 'controlled' }}
              />
              <span>
                Fast search
                  <Tooltip title="Get faster access to your results: if you choose this modality the results could be less accurate.">
                    <IconButton>
                      <InfoIcon/>
                    </IconButton>
                </Tooltip>
              </span>

          </Box>
              <Box sx={{ height: 40 }}>
                <Fade
                  in={loading}
                  style={{
                    transitionDelay: loading ? '800ms' : '0ms',
                  }}
                  unmountOnExit
                >
              <LinearProgress color='primary'/>
            </Fade>
          </Box>
        </div>
        );
  }
  
export default SearcBar;

