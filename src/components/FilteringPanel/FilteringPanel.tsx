import React from 'react';
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

import { TopicIndex, Paper, SearchAPIResponse, SearchResults } from '../../utility/interfaces';
import { connect } from 'react-redux';

import { RootState } from '../../utility/store';
import { updateListFilter, updateRangeFilter, updateStringFilter, updateValueFilter, clean} from './FilteringSlice';
import {FilteringState, FilterListUpdater,FilterRangeUpdater, FilterStringUpdater, FilterValueUpdater, FilteringPanelProps, FilterAPIResponse, Criteria} from '../../utility/interfaces'
import { Dispatch } from 'redux';

import { DATE_MIN, DATE_MAX, CIT_MIN, CIT_MAX } from '../../utility/constants'; 
import { selectResults } from '../SearchBar/SearchResultsSlice';
import {useAppSelector} from '../../utility/hooks'

const mapStateToProps = (state: RootState) => ({
    topic: state.filters.topic,
    authors: state.filters.authors,
    date: state.filters.date,
    citationCount: state.filters.citationCount,
    availability: state.filters.availability
} as FilteringState);

const mapDispatchToProps = (dispatch: Dispatch) => ({
    updateListFilter: (updater: FilterListUpdater) => dispatch(updateListFilter(updater)),
    updateRangeFilter: (updater: FilterRangeUpdater) => dispatch(updateRangeFilter(updater)),
    updateStringFilter: (updater: FilterStringUpdater) => dispatch(updateStringFilter(updater)),
    updateValueFilter: (updater: FilterValueUpdater) => dispatch(updateValueFilter(updater))
} )

const FilteringPanel = (props: FilteringPanelProps) => {

    const [openTopics, setOpenTopics] = React.useState(false);
    const [openPublicationYear, setOpenPublicationYear] = React.useState(false);
    const [openCitationCount, setOpenCitationCount] = React.useState(false);
    const [openAuthors, setOpenAuthors] = React.useState(false);
    const [openAvailability, setAvailability] = React.useState(false);


    const [checked, setChecked] = React.useState([] as Array<number>);
    //Set as unchecked the first element of the list

    const [errorMinDate, setErrorMinDate] = React.useState(false);
    const [errorMaxDate, setErrorMaxDate] = React.useState(false);

    const [errorMinCitCount, setErrorMinCitCount] = React.useState(false);
    const [errorMaxCitCount, setErrorMaxCitCount] = React.useState(false);

    const [availabilityFilterValue, setAvailabilityFilterValue] = React.useState('All');

    const data = useAppSelector(selectResults) as SearchResults;

    enum RangedFilters {
        DATE = "date",
        CITCOUNT = "citationCount"
    }

    function listTopics(elementsList: TopicIndex[]) {
        
        const handleClick = () => {
            setOpenTopics(!openTopics);
        };
    
        const handleToggle = (value: number) => () => {
            const currentIndex = checked.indexOf(value);
            const newChecked = [...checked];
            let remove = false;
            
            if (currentIndex === -1) {
                //Element checked
                newChecked.push(value);
                remove = false;
            } else {
                //Element unchecked
                newChecked.splice(currentIndex, 1);
                remove = true;
            }
            
            //Add or remove the topic to the filter list
            props.updateListFilter({
                filterKey: 'topic',
                element: value,
                remove: remove
            } as FilterListUpdater);
            setChecked(newChecked);
            console.log(props);
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

    function filterRange(labelSection: string, open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>>, min: number, max: number, errorMinValue: boolean, setErrorMin: React.Dispatch<React.SetStateAction<boolean>>, errorMaxValue: boolean, setErrorMax: React.Dispatch<React.SetStateAction<boolean>>, key: RangedFilters, regex: RegExp){

        const handleClick = () => {
            setOpen(!open);
        };

        const handleChangeMin = (event: React.ChangeEvent<HTMLInputElement>) => {
            const value = event.target.value;
            if(regex.test(value)){
                //Cast string into number
                let intValue: number = +value;
                if(intValue >= min && intValue <= max){
                    props.updateRangeFilter({
                        filterKey: key,
                        updateMin: true,
                        value: intValue,
                    } as FilterRangeUpdater);
                    setErrorMin(false)
                    console.log("Min value set: " + value)
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
                    props.updateRangeFilter({
                        filterKey: key,
                        updateMin: false,
                        value: intValue
                    } as FilterRangeUpdater);
                    setErrorMax(false)
                    console.log("Max value set: " + value)
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
                            id="min"
                            label="From"
                            type="search"
                            value={props[key].min}
                            error = {errorMinValue}
                            onChange={handleChangeMin}
                            onKeyPress={handleKeyPressed}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            />
                            <TextField
                            id="max"
                            label="To"
                            type="search"
                            value={props[key].max}
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
            props.updateStringFilter({
                filterKey: 'authors',
                text: authorsString,
            } as FilterStringUpdater);
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
                            value={props.authors}
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
            let elemIdx = states.indexOf(selectedValue);
            console.log("Availability: " + elemIdx);
            props.updateValueFilter({
                filterKey: 'availability',
                value: elemIdx
            } as FilterValueUpdater);
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
            //TODO send request to the back-end
            let jsonToSend: FilterAPIResponse = {
                documents: data.documents,
                criteria: props
            }
            console.log(jsonToSend);
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
            {filterRange("Publication Year", openPublicationYear, setOpenPublicationYear, DATE_MIN, DATE_MAX, 
            errorMinDate, setErrorMinDate, errorMaxDate, setErrorMaxDate, RangedFilters.DATE, new RegExp('1[0-9]{3}|2[0-9]{3}'))}
            {filterRange("Citation Count", openCitationCount, setOpenCitationCount, CIT_MIN, CIT_MAX, 
            errorMinCitCount, setErrorMinCitCount, errorMaxCitCount, setErrorMaxCitCount, RangedFilters.CITCOUNT, new RegExp('^[0-9\b]+$'))}
            {filterAuthors()}
            {filterAvailability()}
            {buttonFilter()}
        </List>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(FilteringPanel);