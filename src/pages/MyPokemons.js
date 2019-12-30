import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { useSelector } from 'react-redux'
import PokeCard from '../components/PokeCard'

export default function MyPokemons() {

    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const favorites = useSelector(state =>  state.favorites.items );

    const handleChange = e => {
        setSearchTerm(e.target.value);
    };
    
    useEffect(() => {
        const results = favorites.filter(pokemon =>
            pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(results);
    }, [favorites, searchTerm]);

    return (
        <div>
            <Grid container style={{ marginBottom: '20px' }}
                direction="row">
                <Input
                    id="search"
                    type="text"
                    onChange={handleChange}
                    fullWidth={true}
                    placeholder="Search"
                    endAdornment={
                        <InputAdornment position="start">
                            <IconButton
                            ><SearchIcon /></IconButton>
                        </InputAdornment>
                    }
                />
            </Grid>

            <Grid container
                direction="row"
                alignItems="flex-start" spacing={1}>
                {searchResults.map((item, i) => (
                    <Grid key={i} item xs={12} sm={6} md={3} xl={2} >
                        <PokeCard pokemon={item}></PokeCard>
                    </Grid>

                ))}
            </Grid>
        </div>
    )
}
