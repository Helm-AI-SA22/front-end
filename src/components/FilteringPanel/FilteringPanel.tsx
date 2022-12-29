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
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import PeopleIcon from '@mui/icons-material/People';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LockIcon from '@mui/icons-material/Lock';
import TopicIcon from '@mui/icons-material/Topic';
import SourceIcon from '@mui/icons-material/Summarize';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import arxiv from '../../assets/logo/arxiv.png';
import ieee from '../../assets/logo/ieee.jpeg';
import scopus from '../../assets/logo/scopus.png';

import { TopicIndex, Paper, SearchResults } from '../../utility/interfaces';
import { connect } from 'react-redux';

import { RootState } from '../../utility/store';
import { updateListFilter, updateRangeFilter, updateStringFilter, updateValueFilter, clean, criteriaToAPI, selectAvailability} from './FilteringSlice';
import {FilteringState, FilterListUpdater,FilterRangeUpdater, FilterStringUpdater, FilterValueUpdater, FilteringPanelProps, FilterAPIRequest, FilterMode} from '../../utility/interfaces'
import { Dispatch } from 'redux';

import { DATE_MIN, DATE_MAX, CIT_MIN, CIT_MAX } from '../../utility/constants'; 
import { filter, selectResults, update, selectOriginalDocs, selectTopicsIndex } from '../SearchBar/SearchResultsSlice';
import {useAppSelector, useAppDispatch} from '../../utility/hooks'
import {filterAPI} from '../../utility/api'
import {updateCurrentPage} from '../../components/ResultsList/PaginationSlice'
import TopicChip from '../TopicChip/TopicChip';

import {FormControlLabel, FormGroup, IconButton, Switch, Typography} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import Tooltip from '@mui/material/Tooltip';


const mapStateToProps = (state: RootState) => ({
    topic: state.filters.topic,
    authors: state.filters.authors,
    date: state.filters.date,
    sources: state.filters.sources,
    citationCount: state.filters.citationCount,
    availability: state.filters.availability,
    preprint: state.filters.preprint,
    mode: state.filters.mode
} as FilteringState);

const mapDispatchToProps = (dispatch: Dispatch) => ({
    updateListFilter: (updater: FilterListUpdater) => dispatch(updateListFilter(updater)),
    updateRangeFilter: (updater: FilterRangeUpdater) => dispatch(updateRangeFilter(updater)),
    updateStringFilter: (updater: FilterStringUpdater) => dispatch(updateStringFilter(updater)),
    updateValueFilter: (updater: FilterValueUpdater) => dispatch(updateValueFilter(updater))
} )

const FilteringPanel = (props: FilteringPanelProps) => {

    const dispatch = useAppDispatch();
    const [openTopics, setOpenTopics] = React.useState(false);
    const [openSources, setOpenSources] = React.useState(false);

    const [openPublicationYear, setOpenPublicationYear] = React.useState(false);
    const [openCitationCount, setOpenCitationCount] = React.useState(false);
    const [openAuthors, setOpenAuthors] = React.useState(false);
    const [openAvailability, setOpenAvailability] = React.useState(false);
    const [openPreprint, setOpenPreprint] = React.useState(false);

    const [checked, setChecked] = React.useState([] as Array<number>);

    const [errorMinDate, setErrorMinDate] = React.useState(false);
    const [errorMaxDate, setErrorMaxDate] = React.useState(false);

    const [errorMinCitCount, setErrorMinCitCount] = React.useState(false);
    const [errorMaxCitCount, setErrorMaxCitCount] = React.useState(false);

    const [availabilityFilterValue, setAvailabilityFilterValue] = React.useState('-1');
    const [preprintFilterValue, setPreprintFilterValue] = React.useState('-1');

    const data = useAppSelector(selectResults) as SearchResults;
    const originalDocs = useAppSelector(selectOriginalDocs) as Paper[];

    enum RangedFilters {
        DATE = "date",
        CITCOUNT = "citationCount"
    }

    enum ListedFilters {
        AVAILABILITY = 'availability',
        PREPRINT = 'preprint'
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

        const handleTopicFilteringMode = () => {
            props.updateValueFilter({
                filterKey: 'mode', 
                value: ((props.mode == FilterMode.UNION) ? FilterMode.INTERSECTION : FilterMode.UNION)
            } as FilterValueUpdater);
        }
        
        return(
            <Box>
                <Divider sx={{ml:1}}/>
                <ListItemButton onClick={handleClick} sx={{justifyContent:'space-between'}}>
                    <Box display="flex" flexDirection="row" alignItems="center">
                        <TopicIcon sx={{mr:1}}/>
                        <ListItemText primary= {"Topics"} />
                    </Box>
                    {openTopics ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openTopics} timeout="auto" unmountOnExit>
                    <Stack direction={'row'} spacing={0.5}>
                        <FormGroup>
                            <FormControlLabel control={<Switch value={props.mode} onChange={handleTopicFilteringMode}/>} label="Intersection" sx={{mt:1, ml:4}}/>
                        </FormGroup>
                        <Tooltip title="Selects only documents that satisfy all filters at once">
                            <IconButton size='small'>
                                <InfoIcon/>
                            </IconButton>
                        </Tooltip>
                    </Stack>
                    <Box sx={{marginLeft: 3}}>
                        {/** Generates a row for each element of the list */}
                        {elementsList.map((value, idx) => {
                            const isSlow = window.location.href.split("/")[3] == "slow";
                            const topicIdx = idx+(isSlow ? 0 : 1)
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
                                        <ListItemText id={value.name} primary={
                                            <>
                                                <span style={{ fontWeight: 'bold' }}>{ `Topic ${topicIdx}`}: </span>
                                                {value.name}
                                            </>
                                            } secondary={'('+(value.ratio*100)+'% of documents)'}/>
                                    </ListItemButton>
                                    <TopicChip id={value.id} idx={topicIdx} name={value.name} summary={value.summary} hideName/>
                                </ListItem>
                            );
                        })}
                    </Box>
                </Collapse>
                <Divider sx={{ml:1}}/>
            </Box>
        );
    
    }


    function filterSource(elementsList: string[]) {
        
        const handleClick = () => {
            setOpenSources(!openSources);
        };
    
        const handleToggle = (value: string, index: number) => () => {
            const currentIndex = checked.indexOf(index);
            const newChecked = [...checked];
            let remove = false;
            
            if (currentIndex === -1) {
                //Element checked
                newChecked.push(index);
                remove = false;
            } else {
                //Element unchecked
                newChecked.splice(currentIndex, 1);
                remove = true;
            }
            
            //Add or remove the topic to the filter list
            props.updateListFilter({
                filterKey: 'sources',
                element: value,
                remove: remove
            } as FilterListUpdater);
            setChecked(newChecked);
            console.log(props);
        };
        
        return(
            <Box>
                <Divider sx={{ml:1}}/>
                <ListItemButton onClick={handleClick} sx={{justifyContent:'space-between'}}>
                    <Box display="flex" flexDirection="row" alignItems="center">
                        <SourceIcon sx={{mr:1}}/>
                        <ListItemText primary= {"Sources"} />
                    </Box>
                    {openSources ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openSources} timeout="auto" unmountOnExit>
                    <Box sx={{marginLeft: 3}}>
                        {/** Generates a row for each element of the list */}
                        {elementsList.map((src_name, src_index) => {
                            return (
                                <ListItem key={src_name} disablePadding>
                                    <ListItemButton role={undefined} onClick={handleToggle(src_name, src_index)}>
                                        <ListItemIcon>
                                            <Checkbox
                                            edge="start"
                                            checked={checked.indexOf(src_index) !== -1}
                                            tabIndex={-1}
                                            disableRipple
                                            inputProps={{ 'aria-labelledby': src_name }}
                                            />
                                        </ListItemIcon>
                                        {(src_name =="arxiv") ?  <Box component="img" sx={{height: 20, ml:1}} alt="source logo" src={arxiv}/>
                                        : (src_name =="ieee") ? <Box component="img" sx={{height: 20, ml:1}} alt="source logo" src={ieee}/>
                                        : <Box component="img" sx={{height: 20, ml:1}} alt="source logo" src={scopus}/>}
                                        {/* <ListItemText id={src_name} primary={src_name}/> */}
                                    </ListItemButton>
                                </ListItem>
                            );
                        })}
                    </Box>
                </Collapse>
                <Divider sx={{ml:1}}/>
            </Box>
        );
    
    }

    function filterRange(labelSection: string, open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>>, min: number, max: number, errorMinValue: boolean, setErrorMin: React.Dispatch<React.SetStateAction<boolean>>, errorMaxValue: boolean, setErrorMax: React.Dispatch<React.SetStateAction<boolean>>, key: RangedFilters, regex: RegExp){

        const handleClick = () => {
            setOpen(!open);
        };

        const handleChangeMin = (event: React.ChangeEvent<HTMLInputElement>) => {
            const value = event.target.value;
            let error = false;
            if(regex.test(value)){
                //Cast string into number
                let intValue: number = +value;
                if((intValue >= min && intValue <= max) && (!(intValue > props[key].max))){
                    props.updateRangeFilter({
                        filterKey: key,
                        updateMin: true,
                        value: intValue,
                    } as FilterRangeUpdater);
                    error = false;
                    console.log("Min value set: " + value)
                }
                else{
                    error = true;
                    console.log("Format error");
                }
            }
            else{
                //Handle the empty filed case
                if(value == ""){
                    props.updateRangeFilter({
                        filterKey: key,
                        updateMin: true,
                        value: min,
                    } as FilterRangeUpdater);
                    console.log("Min value set to empty")
                    error = false;
                }
                else{
                    error = true;
                    console.log("Format error");
                }
            }

            setErrorMin(error);
            setErrorMax(error);
        };

        const handleChangeMax = (event: React.ChangeEvent<HTMLInputElement>) => {
            const value = event.target.value;
            let error = false;
            if(regex.test(value)){
                let intValue: number = +value;
                if((intValue >= min && intValue <= max) && (!(intValue < props[key].min))){
                    console.log(value)
                    props.updateRangeFilter({
                        filterKey: key,
                        updateMin: false,
                        value: intValue
                    } as FilterRangeUpdater);
                    error = false;
                    console.log("Max value set: " + value)
                }
                else{
                    error = true;
                    console.log("Format error");
                }
            }
            else{
                //Handle the empty filed case
                if(value == ""){
                    props.updateRangeFilter({
                        filterKey: key,
                        updateMin: false,
                        value: max,
                    } as FilterRangeUpdater);
                    console.log("Max value set to empty")
                    error = false;
                }
                else{
                    error = true;
                    console.log("Format error");
                }
            }

            setErrorMin(error);
            setErrorMax(error);
        };

        const handleKeyPressed = () => {
            return false;
        };

        return(
            <Box>
                <ListItemButton onClick={handleClick} sx={{justifyContent:'space-between'}}>
                    <Box display="flex" flexDirection="row" alignItems="center">
                        {labelSection =="Citations" ? <TrendingUpIcon sx={{mr:1}}/>: <CalendarMonthIcon sx={{mr:1}}/>}
                        <ListItemText primary= {labelSection} />
                    </Box>
                    {open ? <ExpandLess /> : <ExpandMore />}
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
                            defaultValue={props[key].min}
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
                            defaultValue={props[key].max}
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
                <Divider sx={{ml:1}}/>
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
                <ListItemButton onClick={handleClick} sx={{justifyContent:'space-between'}}>
                    <Box display="flex" flexDirection="row" alignItems="center">
                        <PeopleIcon sx={{mr:1}}/>
                        <ListItemText primary= {'Authors'} />
                    </Box>
                    {openAuthors ? <ExpandLess /> : <ExpandMore />}
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
                <Divider sx={{ml:1}}/>
            </Box>
        );
    }

    function filterList(labelSection: string, key: ListedFilters, labelBox: string, states: string[], statesKeys: number[], open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>>, value: string, setValue: React.Dispatch<React.SetStateAction<string>>){

        const handleClick = () => {
            setOpen(!open);
        };

        const handleChange = (event: SelectChangeEvent) => {
            let selectedValue = event.target.value;
            console.log("Selected value: " + selectedValue)
            setValue(selectedValue);
            //Cast string into number
            const numSelectedValue: number = +selectedValue
            let elemIdx = statesKeys.indexOf(numSelectedValue);
            console.log("Element index: " + elemIdx)
            console.log(labelSection + ": " + elemIdx);
            props.updateValueFilter({
                filterKey: key,
                value: numSelectedValue
            } as FilterValueUpdater);
        }
        
        return(
            <Box>
                <ListItemButton onClick={handleClick} sx={{justifyContent:'space-between'}}>
                    <Box display="flex" flexDirection="row" alignItems="center">
                        <LockIcon sx={{mr:1}}/>
                        <ListItemText primary= {labelSection} />
                    </Box>
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box sx={{m: 2, width: '75%'}}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">{labelBox}</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label={labelSection}
                        onChange={handleChange}
                        value={value}
                        >
                        <MenuItem value={statesKeys[0]}>{states[0]}</MenuItem>
                        <MenuItem value={statesKeys[1]}>{states[1]}</MenuItem>
                        <MenuItem value={statesKeys[2]}>{states[2]}</MenuItem>
                        </Select>
                    </FormControl>
                    </Box>
                </Collapse>
                <Divider sx={{ml:1}}/>
            </Box>
        );
    }

    function buttonFilter(errorsList: boolean[]){

        const handleClick = async () => {

            if(errorsList.every(element => element === false)){
                let jsonToSend: FilterAPIRequest = {
                    documents: originalDocs,
                    criteria: criteriaToAPI(props),
                    topics: data.topics
                }

                const response = await filterAPI(jsonToSend);
                const payload = response.data as SearchResults;
                payload.topicsVisualization = data.topicsVisualization;
                payload.topics = data.topics;
                payload.sources = data.sources;
                payload.max_tfidf = data.max_tfidf;
                dispatch(filter());
                dispatch(updateCurrentPage(1));
                dispatch(update(response.data as SearchResults));
                console.log(jsonToSend);
            }
            else{
                alert("Wrong values, unable to complete filtering");
            }
        };

        return(
            <Box>
                <Button variant="contained"
                onClick={handleClick}
                >
                    Apply
                </Button>
            </Box>
        );
    }

    function buttonClearFilters(setOpenList: React.Dispatch<React.SetStateAction<boolean>>[]){

        const handleClick = async () => {
            dispatch(clean());
            setAvailabilityFilterValue("-1");
            setChecked([]);
            for(let i=0; i<openList.length; i++){
                let func = setOpenList[i];
                func(false);
            }
        };

        return(
            <Box>
                <Button variant="contained"
                onClick={handleClick}
                >
                    Clean
                </Button>
            </Box>
        );
    }

    const topicsList: TopicIndex[] = data.topics;
    const sourcesList: string[] = data.sources;

    let authorsString: string = "";
    const statesAvailabilityKeys = [-1, 1, 0];
    const statesAvailability = ["All", "Yes", "No"];
    const statesPreprint = ["All", "Peer reviewed only", "Preprint only"];
    const statesPreprintKeys = [-1, 0, 1];
    const errorsList = [errorMinDate, errorMaxDate, errorMinCitCount, errorMaxCitCount];
    const openList = [openTopics, openAuthors, openPublicationYear, openCitationCount, openAvailability, openPreprint];
    const setOpenList = [setOpenTopics, setOpenAuthors, setOpenPublicationYear, setOpenCitationCount, setOpenAvailability, setOpenPreprint];

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
            {filterRange("Publication year", openPublicationYear, setOpenPublicationYear, DATE_MIN, DATE_MAX, 
            errorMinDate, setErrorMinDate, errorMaxDate, setErrorMaxDate, RangedFilters.DATE, new RegExp('1[0-9]{3}|2[0-9]{3}'))}
            {filterRange("Citations", openCitationCount, setOpenCitationCount, CIT_MIN, CIT_MAX, 
            errorMinCitCount, setErrorMinCitCount, errorMaxCitCount, setErrorMaxCitCount, RangedFilters.CITCOUNT, new RegExp('^[0-9\b]+$'))}
            {filterAuthors()}
            {filterList("Availability", ListedFilters.AVAILABILITY, "Availability", statesAvailability, statesAvailabilityKeys, openAvailability, setOpenAvailability, availabilityFilterValue, setAvailabilityFilterValue)}
            {filterSource(sourcesList)}
            {/**filterList("Peer reviewed", ListedFilters.PREPRINT, "Peer reviewed", statesPreprint, statesPreprintKeys, openPreprint, setPreprint, preprintFilterValue, setPreprintFilterValue)*/}
            <Stack spacing={2} direction="row" sx={{m: 3}}>
                {buttonFilter(errorsList)}
                {buttonClearFilters(setOpenList)}
            </Stack>
            
        </List>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(FilteringPanel);