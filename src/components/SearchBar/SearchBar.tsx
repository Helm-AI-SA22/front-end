import React from 'react';
import './SearchBar.css';

import {Autocomplete, TextField, Button, Chip} from '@mui/material';
import { Search } from '@mui/icons-material' 
import Switch from '@mui/material/Switch';

import { searchAPI } from '../../api/api'
import { TopicModelingAlgorithm } from '../../api/interfaces';

const options = ['Siamese Network',  'Social Robotics'];

const SearcBar = () => {
    const [value, setValue] = React.useState<string[]>(options);
    const [inputValue, setInputValue] = React.useState('');
    const [checked, setChecked] = React.useState(false);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setChecked(event.target.checked);
    };

      return (
        <div >
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
                  options={options}
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
                  alert(`You are searching: ${value.map((kw => kw + ' '))}.  Research type: ${checked ? 'fast': 'slow'}.`);
                  await searchAPI({
                    keywords: value, 
                    type: (checked ? 'LDA' : 'BERT') as TopicModelingAlgorithm});
                  //@redirect
                }
              }}>
                  Search
              </Button>
          </div>
          <div className= "switch-contained">
            <Switch
              checked={checked}
              onChange={handleChange}
              inputProps={{ 'aria-label': 'controlled' }}
              />
          </div>
        </div>
        );
  }
  
export default SearcBar;

