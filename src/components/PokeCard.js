import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PokeApiService from '../services/PokeApiService'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useDispatch } from 'react-redux';
import { addFav, removeFav } from '../actions'
import { useSelector } from 'react-redux';
import _array from 'lodash/array'
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
    card: {
        textAlign: 'center',
        '&:hover': {
            background: "rgba(0, 0, 0, 0.08)",
        },
        cursor: "pointer"
    },
    media: {
        height: 200,
        position: 'relative'
    },
    text: {
        textTransform: "capitalize"
    },
    fav: { position: 'absolute' }
});
const PokeCard = React.memo((probs) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const favorites = useSelector(state => state.favorites)
    const [favColor, setFavColor] = useState("");
    let history = useHistory();

    const clickFav = (e) => {
        e.stopPropagation();
        const index = _array.findIndex(favorites.items, function (fav) {
            return fav.name === probs.pokemon.name;
        });

        if (index > -1) {
            setFavColor("");
            dispatch(removeFav(index));
        } else {
            setFavColor("red");
            dispatch(addFav(probs.pokemon));
        }
    }

    useEffect(() => {
        const index = _array.findIndex(favorites.items, function (fav) {
            return fav.name === probs.pokemon.name;
        });
        if (index > -1) {
            setFavColor("red")
        } else {
            setFavColor("")
        }
    }, [favorites, probs.pokemon.name])

    return (
        <Card className={classes.card} onClick={() => history.push('/detail/' + probs.pokemon.name)} >
            <div>
                <div className={classes.media}  >
                    <IconButton
                        className={classes.fav}
                        style={{ color: favColor }}
                        onClick={clickFav}
                        aria-label="add to favorites">
                        <FavoriteIcon />
                    </IconButton>

                    <LazyLoadImage
                        key={probs.pokemon.url}
                        height={200}
                        width={200}
                        visibleByDefault={false}
                        src={PokeApiService.getImage(probs.pokemon.url)}
                    />

                </div>

                <CardContent style={{ padding: "0 10px" }}>
                    <Typography align="center" className={classes.text} gutterBottom variant="h6">
                        {probs.pokemon.name}
                    </Typography>
                </CardContent>
            </div>
        </Card>
    );
})

export default PokeCard;