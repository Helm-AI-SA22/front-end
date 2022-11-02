import React, {Component } from 'react';
import './SearchBar.css';

import {Autocomplete, TextField} from '@mui/material';

interface AutocompleteOption {
    label: string;
  }

const options = [
    { label: 'The Godfather', id: 1 },
    { label: 'Pulp Fiction', id: 2 },
  ];

export default class SearcBar extends Component {
    render(){ 
        return (
            <div className="SearcBar">
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={options}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Movie" />}
                />
            </div>
          );
    }
  
}