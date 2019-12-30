import React from 'react'
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';

const margin = { margin: "4px" }
export default function Profile(probs) {

    return (
        <div style={{ marginTop: '20px' }}>
            <Paper>
                <Box p={5}>
                    <Chip style={margin} label="Weight" color="primary" avatar={<Avatar>{probs.info.weight}</Avatar>} />
                    <Chip style={margin} label="Height" color="primary" avatar={<Avatar>{probs.info.height}</Avatar>} />
                    <Chip style={margin} label="Experience" color="primary" avatar={<Avatar>{probs.info.base_experience}</Avatar>} />
                    <Chip style={margin} label="Order" color="primary" avatar={<Avatar>{probs.info.order}</Avatar>} />
                </Box>
            </Paper>
        </div>
    )
}

