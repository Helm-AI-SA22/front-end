import React, {Component } from 'react';
import logo from './logo.svg';
import './Layout.css';

import {Autocomplete, TextField} from '@mui/material';

interface AutocompleteOption {
    label: string;
  }

const options = [
    { label: 'The Godfather', id: 1 },
    { label: 'Pulp Fiction', id: 2 },
  ];

export default class Layout extends Component {
    render(){ 
        return (
            <div className="Layout">
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

