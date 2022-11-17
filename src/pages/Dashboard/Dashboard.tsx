import React, {Component } from 'react';

import './Dashboard.css';
import Layout from '../../components/Layout/Layout';
import AppBar from '../../components/AppBar/AppBar';
import { useAppSelector } from '../../utility/hooks';
import { useLocation, useParams } from 'react-router-dom';
import { selectDocuments } from '../../components/SearchBar/documentsSlice';

const Dashboard = () => {
    const { querytext } = useParams();
    const speed_str = useLocation()['pathname'].split('/')[1];
    const documents =  useAppSelector(selectDocuments);

    console.log(speed_str, documents, querytext )
    return (
        <div>
            <AppBar></AppBar>
            <Layout></Layout>
        </div>
        );
}


export default Dashboard ;