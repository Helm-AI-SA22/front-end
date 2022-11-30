import React, { Component, lazy, Suspense } from 'react';
import { Typography, Divider, IconButton } from '@mui/material';

import './About.css';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Container } from '@mui/system';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Grid from '@mui/material/Grid';
import { Person } from '../../utility/interfaces';
import peopleJson from '../../assets/peopleList.json';


const peopleArray: Person[] = peopleJson;


const populate = peopleArray.map(function (person: Person, index: number) {

    return (
        <Grid item xs={6} sm={4} md={3} key={index}>
            <Card sx={{ m: 1, p: 1, bgcolor: 'background.paper', borderRadius: 0, maxWidth: 355 }}>
                <CardMedia
                    component="img"
                    alt="green iguana"
                    height="140"
                    src={person.image_source}
                />
                <CardContent>
                    <Typography gutterBottom variant="h6" component="div" sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                        {person.fullName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {person.description}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <IconButton onClick={() => { window.open(person.linkedin_url) }}>
                            <LinkedInIcon fontSize="large" sx={{ color: "#0077b5" }} />
                        </IconButton>
                        <IconButton onClick={() => { window.open(person.github_url) }}>
                            <GitHubIcon fontSize="large" sx={{ color: "black" }} />
                        </IconButton>
                    </Container>

                </CardActions>
            </Card>
        </Grid>
    )
});

export default class AboutPage extends Component {

    render() {

        return (
            <Container>
                <Container maxWidth="md">
                    <Typography
                        sx={{ m: 5, p: 1, fontWeight: 'bold' }}
                        component="h1"
                        variant="h2"
                        align="center"
                        color="text.primary"
                        gutterBottom
                    >
                        Our Team
                    </Typography>
                </Container>
                

                <Grid container spacing={{ xs: 2, md: 3 }}>

                    {populate}

                </Grid>
                <Container maxWidth="md">
                    <Typography
                        component="h1"
                        variant="h4"
                        color="text.primary"
                        gutterBottom
                    >
                        I 12 Trimoni
                    </Typography>
                </Container>
            </Container>


        );
    }
}