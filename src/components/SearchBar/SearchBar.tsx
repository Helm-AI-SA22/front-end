import React from 'react';
import './SearchBar.css';

import { useNavigate } from 'react-router-dom';
import {Autocomplete, TextField, Button, Chip} from '@mui/material';
import { Search } from '@mui/icons-material' 
import Switch from '@mui/material/Switch';
import InfoIcon from '@mui/icons-material/Info';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';

import { searchAPI } from '../../api/api';
import { TopicModelingAlgorithm } from '../../api/interfaces';
import  suggestions  from '../../assets/suggestions.json'

const SearcBar = () => {
    const navigate = useNavigate();
    const [value, setValue] = React.useState<string[]>([]);
    const [inputValue, setInputValue] = React.useState('');
    const [checked, setChecked] = React.useState(false);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setChecked(event.target.checked);
    };

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
              <Button variant="contained" endIcon={<Search />} className="search-button" onClick={async () => {
                console.log(value)
                if(value.length){
                  const speed = checked ? 'fast': 'slow';
                  alert(`You are searching: ${value.map((kw => kw + ' '))}.  Research type: ${speed}.`);
                  await searchAPI({
                    keywords: value, 
                    type: (checked ? 'LDA' : 'BERT') as TopicModelingAlgorithm
                  });
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
                  <Tooltip title="Switch on the fast search modality to obtain faster access to your results.">
                    <IconButton>
                      <InfoIcon/>
                    </IconButton>
                </Tooltip>
              </span>

          </Box>
        </div>
        );
  }
  
export default SearcBar;

