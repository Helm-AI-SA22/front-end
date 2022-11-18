import React, {Component, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import ListItem from '@mui/material/ListItem';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';


import { TopicIndex, Paper, SearchAPIResponse } from '../../utility/interfaces';

//TODO remove mock dataset
import data from '../../assets/fast_be_fe.json' ;

const FilteringPanel = () => {

    interface Range{
        min: number;
        max: number;
    };

    interface Criteria{
        topic?: number[];
        date?: Range;
        authors?: string[];
        citationCount?: Range;
        availability?: number;
    };

    interface FilterAPIRequest{
        documents: Paper[];
        criteria: Criteria | null ;

    };

    const rangeDict: Range = {
        min: 0,
        max: 0
    };
    
    const jsonToSend = { 
        documents: data.documents as Array<Paper>,
        criteria: {
            topic: [] as Array<number>,
            date: rangeDict,
            authors: [] as Array<string>,
            citationCount: rangeDict,
            availability: 0
        }
    } as FilterAPIRequest;

    const [openTopics, setOpenTopics] = React.useState(false);
    const [openPublicationYear, setOpenPublicationYear] = React.useState(false);
    const [openCitationCount, setOpenCitationCount] = React.useState(false);
    const [openAuthors, setOpenAuthors] = React.useState(false);
    const [openAvailability, setAvailability] = React.useState(false);


    const [checked, setChecked] = React.useState([0]);
    //Set as unchecked the first element of the list
    checked[0] = -1;

    const [errorMinDate, setErrorMinDate] = React.useState(false);
    const [errorMaxDate, setErrorMaxDate] = React.useState(false);

    const [errorMinCitCount, setErrorMinCitCount] = React.useState(false);
    const [errorMaxCitCount, setErrorMaxCitCount] = React.useState(false);

    const [availabilityFilterValue, setAvailabilityFilterValue] = React.useState('All');

    //TODO fix that when close a section all filters are deleted

    //TODO understand why topic array is empty at the button click
    function listTopics(elementsList: TopicIndex[]) {
        
        const handleClick = () => {
            setOpenTopics(!openTopics);
        };
    
        const handleToggle = (value: number) => () => {
            const currentIndex = checked.indexOf(value);
            const newChecked = [...checked];
        
            if (currentIndex === -1) {
                //Element checked
                newChecked.push(value);
                //Add the topic to the filter list
                if(jsonToSend.criteria && jsonToSend.criteria.topic){
                    jsonToSend.criteria.topic.push(value);
                    console.log(jsonToSend.criteria);
                }
            } else {
                //Element unchecked
                newChecked.splice(currentIndex, 1);
                if(jsonToSend.criteria && jsonToSend.criteria.topic){
                    const idx = jsonToSend.criteria.topic.indexOf(value);
                    //Remove the value if it is in the list
                    if(idx != -1){
                        jsonToSend.criteria.topic.splice(idx, 1);
                    }
                    console.log(jsonToSend.criteria);
                }
            }
        
            setChecked(newChecked);
        };
        
        return(
            <Box>
                <ListItemButton onClick={handleClick}>
                    {openTopics ? <ExpandLess /> : <ExpandMore />}
                    <ListItemText primary= {"Topics"} />
                </ListItemButton>
                <Collapse in={openTopics} timeout="auto" unmountOnExit>
                    <Box sx={{marginLeft: 3}}>
                        {/** Generates a row for each element of the list */}
                        {elementsList.map((value) => {
                            return (
                                <ListItem key={value.id} disablePadding>
                                    <ListItemButton role={undefined} onClick={handleToggle(value.id)}>
                                        <ListItemIcon>
                                            <Checkbox
                                            edge="start"
                                            checked={checked.indexOf(value.id) !== -1}
                                            tabIndex={-1}
                                            disableRipple
                                            inputProps={{ 'aria-labelledby': value.name }}
                                            />
                                        </ListItemIcon>
                                        <ListItemText id={value.name} primary={value.name}/>
                                    </ListItemButton>
                                </ListItem>
                            );
                        })}
                    </Box>
                </Collapse>
            </Box>
        );
    
    }

    //TODO disable refresh onKeyPressed
    function filterRange(labelSection: string, open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>>, min: number, max: number, errorMinValue: boolean, setErrorMin: React.Dispatch<React.SetStateAction<boolean>>, errorMaxValue: boolean, setErrorMax: React.Dispatch<React.SetStateAction<boolean>>, key: string, regex: RegExp){

        const handleClick = () => {
            setOpen(!open);
        };

        const handleChangeMin = (event: React.ChangeEvent<HTMLInputElement>) => {
            const value = event.target.value;
            if(regex.test(value)){
                //Cast string into number
                let intValue: number = +value;
                if(intValue >= min && intValue <= max){
                    if(jsonToSend.criteria){
                        ((jsonToSend.criteria as any)[key] as Range).min = intValue
                        console.log(((jsonToSend.criteria as any)[key] as Range).min);
                    }
                    setErrorMin(false)
                }
                else{
                    setErrorMin(true);
                    console.log("Format error");
                }
            }
            else{
                setErrorMin(true);
                console.log("Format error");
            }
        };

        const handleChangeMax = (event: React.ChangeEvent<HTMLInputElement>) => {
            const value = event.target.value;
            if(regex.test(value)){
                let intValue: number = +value;
                if(intValue >= min && intValue <= max){
                    console.log(value)
                    if(jsonToSend.criteria){
                        ((jsonToSend.criteria as any)[key] as Range).max = intValue
                        console.log(((jsonToSend.criteria as any)[key] as Range).max);
                    }
                    setErrorMax(false)
                }
                else{
                    setErrorMax(true);
                    console.log("Format error");
                }
            }
            else{
                setErrorMax(true);
                console.log("Format error");
            }
        };

        const handleKeyPressed = () => {
            return false;
        };

        return(
            <Box>
                <ListItemButton onClick={handleClick}>
                    {open ? <ExpandLess /> : <ExpandMore />}
                    <ListItemText primary= {labelSection} />
                </ListItemButton>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off">

                        <Stack spacing={2} direction="row" sx={{m: 2}}>
                            <TextField
                            id="min-date"
                            label="From"
                            type="search"
                            error = {errorMinValue}
                            onChange={handleChangeMin}
                            onKeyPress={handleKeyPressed}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            />
                            <TextField
                            id="max-date"
                            label="To"
                            type="search"
                            error = {errorMaxValue}
                            onChange={handleChangeMax}
                            onKeyPress={handleKeyPressed}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            />
                        </Stack>

                    </Box>
                </Collapse>
            </Box>
        );
    }

    function filterAuthors(){
        
        const handleClick = () => {
            setOpenAuthors(!openAuthors);
        };

        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            authorsString = event.target.value;
            console.log(authorsString);
        };

        return(
            <Box>
                <ListItemButton onClick={handleClick}>
                    {openAuthors ? <ExpandLess /> : <ExpandMore />}
                    <ListItemText primary= {'Authors'} />
                </ListItemButton>
                <Collapse in={openAuthors} timeout="auto" unmountOnExit>
                    <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off">

                        <Box sx={{m: 2, width: '75%'}}>
                            <TextField
                            id="authors"
                            label="Authors list"
                            multiline
                            maxRows={4}
                            onChange={handleChange}
                            />
                        </Box>

                    </Box>
                </Collapse>
            </Box>
        );
    }

    function filterAvailability(){

        let states = ["All", "Yes", "No"]
        const handleClick = () => {
            setAvailability(!openAvailability);
        };

        const handleChange = (event: SelectChangeEvent) => {
            let selectedValue = event.target.value;
            setAvailabilityFilterValue(selectedValue);
            if(jsonToSend.criteria){
                let idx = states.indexOf(selectedValue);
                jsonToSend.criteria.availability = idx;
                console.log(jsonToSend.criteria)
            }
        }
        
        return(
            <Box>
                <ListItemButton onClick={handleClick}>
                    {openAvailability ? <ExpandLess /> : <ExpandMore />}
                    <ListItemText primary= {"Availability"} />
                </ListItemButton>
                <Collapse in={openAvailability} timeout="auto" unmountOnExit>
                    <Box sx={{m: 2, width: '75%'}}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Free Access</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Free access"
                        onChange={handleChange}
                        value={availabilityFilterValue}
                        >
                        <MenuItem value={'All'}>All</MenuItem>
                        <MenuItem value={'Yes'}>Yes</MenuItem>
                        <MenuItem value={'No'}>No</MenuItem>
                        </Select>
                    </FormControl>
                    </Box>
                </Collapse>
            </Box>
        );
    }

    function buttonFilter(){

        const handleClick = () => {
            if(jsonToSend.criteria && jsonToSend.criteria.authors){
                jsonToSend.criteria.authors = authorsString.split('\n');
            }
            //TODO send request to the back-end
            console.log(jsonToSend.criteria)
        };

        return(
            <Box sx={{m: 2, alignItems: 'center'}}>
                <Button variant="contained"
                onClick={handleClick}
                >
                    Apply
                </Button>
            </Box>
        );
    }

    const topicsList: TopicIndex[] = data.topics;
    const dateMin: number = 1900;
    const dateMax: number = new Date().getFullYear();
    const citMin: number = 0;
    const citMax: number = 1000000;

    let authorsString: string = "";

    return (
        <List 
        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
            <ListSubheader component="div" id="nested-list-subheader">
            Filter by
            </ListSubheader>
        }
        >
            {listTopics(topicsList)}
            {filterRange("Publication Year", openPublicationYear, setOpenPublicationYear, dateMin, dateMax, 
            errorMinDate, setErrorMinDate, errorMaxDate, setErrorMaxDate, 'date', new RegExp('1[0-9]{3}|2[0-9]{3}'))}
            {filterRange("Citation Count", openCitationCount, setOpenCitationCount, citMin, citMax, 
            errorMinCitCount, setErrorMinCitCount, errorMaxCitCount, setErrorMaxCitCount, 'citationCount', new RegExp('^[0-9\b]+$'))}
            {filterAuthors()}
            {filterAvailability()}
            {buttonFilter()}
        </List>
    );
}

export default FilteringPanel;