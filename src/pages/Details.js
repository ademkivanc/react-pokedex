import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { Divider } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';

import PokeApiService from '../services/PokeApiService'
import MovesTable from '../components/MovesTable'
import Profile from '../components/Profile'
import Stats from '../components/Stats'


export default function Details() {
    let { name } = useParams();
    const [loading, setLoading] = useState(true);
    const [pokemon, setPokemon] = useState({});
    const [movesData, setMovesData] = useState([]);


    useEffect(() => {
        setLoading(true);
        PokeApiService.fetchPokemon(name)
            .then((response) => {
                setPokemon(response.data)
                return response.data.moves
            })
            .then((moves) => {
                let movesFetch = [];
                moves.map((item) => movesFetch.push(PokeApiService.fetchPokemonMove(item.move.url)))
                return Promise.all(movesFetch)
            })
            .then((moveList) => {
                let moveData = []
                moveList.map((item) => {
                    moveData.push({
                        move: item.data.names[2].name,
                        power: item.data.power,
                        accuracy: item.data.accuracy,
                        pp: item.data.pp,
                        type: item.data.type.name,
                        category: item.data.meta.category.name
                    })
                    return setMovesData(moveData)
                })
            })
            .then(() => setLoading(false))
            .catch((e) => { setLoading(false); console.log("error", e) })
    }, [name]);

    if (loading) {
        return (<div><LinearProgress /></div>)
    } else
        return (
            <div>
                <Typography style={{ textTransform: "capitalize" }} variant="h5" component="h5">
                    {name}
                </Typography>
                <Divider />
                <Box pt={4}></Box>
                <Grid container spacing={3}>
                    {/* img*/}
                    <Grid item xs={12} md={5} lg={5}>
                        <Paper >
                            <img alt={name} width="100%" src={PokeApiService.getBigImage(pokemon.id)}></img>
                        </Paper>
                        <Grid item xs={12}>
                            <Profile info={pokemon}></Profile>
                        </Grid>
                    </Grid>
                    {/* stats */}
                    <Grid item xs={12} md={7} lg={7}>
                        <Stats info={pokemon}></Stats>
                        <MovesTable moves={movesData}></MovesTable>
                    </Grid>

                </Grid>
            </div>
        )
}
