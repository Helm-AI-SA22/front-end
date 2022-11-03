import React, {Component } from 'react';

import './Home.css';
import SearchBar from '../../components/SearchBar/SearchBar';


export default class HomePage extends Component {
    render(){
        return (
            <SearchBar/>
          );
    }
}