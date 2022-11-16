import React, {Component } from 'react';

import './Dashboard.css';
import Layout from '../../components/Layout/Layout';
import AppBar from '../../components/AppBar/AppBar';
import { useAppSelector } from '../../utility/hooks';
import { useParams } from 'react-router-dom';
import { selectDocuments } from '../../components/SearchBar/documentsSlice';

const Dashboard = () => {
    const { querytext } = useParams();
    const documents =  useAppSelector(selectDocuments);

    console.log(querytext,documents )
    return (
        <div>
            <AppBar></AppBar>
            <Layout></Layout>
        </div>
        );
}


export default Dashboard ;