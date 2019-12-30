import React, { useState, useEffect } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import PokeApiService from '../services/PokeApiService'
import PokeCard from '../components/PokeCard'

const ListOfPokemons = React.memo(() => {
    const [loading, setLoading] = useState(true);
    const [pokemonList, setPokemonList] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        setLoading(true);
        PokeApiService.fetchPokeList()
            .then((response) => {
                setPokemonList(response.data.results)
            })
            .then(() => setLoading(false))
            .catch((e) => { setLoading(false); console.log("error", e) })
    }, []);

    let typingTimeout = 0;
    const handleChange = e => {
        if (typingTimeout) {
            clearTimeout(typingTimeout);
            setLoading(true)
         }

         let keyword = e.target.value;
         typingTimeout = setTimeout(function () {
            setSearchTerm(keyword);
            setLoading(false)
          }, 1000)
    };
    
    useEffect(() => {
        let results = [];
        if (searchTerm) {
            results = pokemonList.filter(pokemon =>
                pokemon.name.includes(searchTerm.toLowerCase())
            );
        } else {
            results = pokemonList;
        }
        setSearchResults(results);
    
    }, [pokemonList, searchTerm]);

    return (
        <div>
            {loading && (<LinearProgress />)}
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
                alignItems="flex-start" spacing={2}>
                {searchResults.map((item, i) => (
                    <Grid key={i} item xs={12} sm={6} md={3} xl={2} >
                        <PokeCard pokemon={item}></PokeCard>
                    </Grid>

                ))}
            </Grid>


        </div>

    )
})

export default ListOfPokemons;
