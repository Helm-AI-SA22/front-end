import React, {Component } from 'react';
import './SearchBar.css';

import {Autocomplete, TextField, Button} from '@mui/material';
import { Search } from '@mui/icons-material' 

import { searchAPI } from '../../api/api'

const options = ['Siamese Network',  'Social Robotics'];

const SearcBar = () => {
    const [value, setValue] = React.useState<string | null>(options[0]);
    const [inputValue, setInputValue] = React.useState('');
    
      return (
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
                  alert(`You are searching: ${value}`);
                  await searchAPI(value);
                  //@redirect
                }
              }}>
                  Search
              </Button>
          </div>
        );
  }
  

export default SearcBar;