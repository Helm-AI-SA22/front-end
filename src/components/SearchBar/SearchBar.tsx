import React from 'react';
import './SearchBar.css';

import {Autocomplete, TextField, Button} from '@mui/material';
import { Search } from '@mui/icons-material' 
import Switch from '@mui/material/Switch';

import { searchAPI } from '../../api/api'
import { SearchAPIRequest, TopicModelingAlgorithm } from '../../api/interfaces';

const options = ['Siamese Network',  'Social Robotics'];

const SearcBar = () => {
    const [value, setValue] = React.useState<string | null>(options[0]);
    const [inputValue, setInputValue] = React.useState('');
    const [checked, setChecked] = React.useState(false);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      console.log(checked)
      setChecked(event.target.checked);
    };

      return (
        <div >
          <div className="search-bar">
              <Autocomplete
                  value={value}
                  onChange={ (event: any, newValue: string | null ) => {
                    setValue(newValue);
                  }}
                  inputValue={inputValue}
                  onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                  }}
                  freeSolo={true}
                  disablePortal
                  className='search-autocomplete'
                  options={options}
                  sx={{ width: 500 }}
                  renderInput={(params) => <TextField {...params} label="Research Topic" />}
              />

              <Button variant="contained" endIcon={<Search />} className="search-button" onClick={async () => {
                if(value){
                  alert(`You are searching: ${value}.  Research type: ${checked ? 'fast': 'slow'}.`);
                  await searchAPI({
                    keywords: [value], 
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

