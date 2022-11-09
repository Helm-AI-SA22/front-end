import React, {Component } from 'react';

import './Dashboard.css';
import Layout from '../../components/Layout/Layout';
import AppBar from '../../components/AppBar/AppBar';

import { useParams } from 'react-router-dom';


const Dashboard = () => {
    const { querytext } = useParams()

    return (
        <div>
            <AppBar></AppBar>
            <Layout></Layout>
            <p> Results for query:  {querytext}</p>
        </div>
        );
}


export default Dashboard ;