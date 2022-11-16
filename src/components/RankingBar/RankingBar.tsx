import React, {Component } from 'react';
import {Box, Grid} from '@mui/material';
import './RankingBar.css'

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

function Rank() {
    const [rank, setRank] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setRank(event.target.value);
    };
    return(
        <div className='formC'>
            <FormControl size='small' sx={{marginLeft: 50,marginTop: 1, minWidth: 130}}>
                <InputLabel size='small' id="demo-simple-select-autowidth-label" sx={{marginTop:0}}>Order by</InputLabel>
                <Select sx={{height: '4vh'}}
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={rank}
                    onChange={handleChange}
                    autoWidth
                    label="Rank"
                >
                <MenuItem sx={{height: '4vh'}} value={20}>Recommended</MenuItem>
                <MenuItem sx={{height: '4vh'}} value={21}>Data</MenuItem>
                <MenuItem sx={{height: '4vh'}} value={22}>Citation number</MenuItem>
                </Select>
            </FormControl>
        </div>
    )
}

export default class RankingBar extends Component{ 

    render() {
        return(
            <Box className="ranking-bar">
                <Rank />
            </Box>
        )
    }
}
