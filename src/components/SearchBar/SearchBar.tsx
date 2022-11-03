import React, {Component } from 'react';
import './SearchBar.css';

import {Autocomplete, TextField, Button} from '@mui/material';
import { Search } from '@mui/icons-material' 

interface AutocompleteOption {
    label: string;
  }

const options = [
    { label: 'Siamese Network', id: 1 },
    { label: 'Social Robotics', id: 2 },
  ];

export default class SearcBar extends Component {
    render(){ 
        return (
            <div className="search-bar">
                <Autocomplete
                    freeSolo={true}
                    disablePortal
                    className='search-autocomplete'
                    options={options}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Research Topic" />}
                />
                <Button variant="contained" endIcon={<Search />} className="search-button" onClick={() => {
                  // @TODO call query api and change route
                  alert('searched');
                }}>
                    Search
                </Button>
            </div>
          );
    }
  
}