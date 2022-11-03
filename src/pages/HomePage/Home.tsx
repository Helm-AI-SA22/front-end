import React, {Component } from 'react';

import './Home.css';
import SearchBar from '../../components/SearchBar/SearchBar';
import bluLogo from '../../assets/logo/black.png';

import { Container } from '@mui/material';

export default class HomePage extends Component {
    render(){
        return (
            <Container maxWidth="xl" className="page">
                <div className="logo-container">
                    <img src={bluLogo} alt="logo" />
                </div>
                <div className='title'>
                    Helm
                </div>
                <div className="searchbarbar-container">
                    <SearchBar/>
                </div>
            </Container>
          );
    }
}