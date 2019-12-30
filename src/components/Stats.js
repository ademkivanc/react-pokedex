import React from 'react'
import Paper from '@material-ui/core/Paper';
import PokeApiService from '../services/PokeApiService'
import Box from '@material-ui/core/Box';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
    score: { position: "absolute", zIndex: 4, color: 'white', top: "20px", left: "5px" }
}));

export default function Stats(probs) {
    const classes = useStyles();
    return (
        <div>
            <Paper className={classes.paper} >
                {probs.info.stats.map((item,i) => (
                    <Box style={{position:"relative"}} mt={1} key={i}>
                        <div>{ PokeApiService.titleCase(item.stat.name) }</div>
                        <div className={classes.score} >{item.base_stat}</div>
                        <LinearProgress style={{ height: "20px" }} value={item.base_stat} variant="determinate" />
                    </Box>
                ))}

            </Paper>

        </div>
    )
}
