import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const columns = [
    "Move", "Power", "Accuracy", "PP", "Type", "Category"
];

function createData(move, power, accuracy, pp, type, category) {
    return { move, power, accuracy, pp, type, category };
}

export default function MovesTable(probs) {
    const min400Width = useMediaQuery('(max-width:450px)');
    const useStyles = makeStyles({
        root: {
            width: (min400Width ? '326px' : '100%') ,
            marginTop: '20px'
        },
        container: {
            maxHeight: 1000,
            width: '100%',
        },
    });
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const rows = []
    probs.moves.map((item) => {
        return rows.push(createData(item.move, item.power, item.accuracy, item.pp, item.type, item.category))
    })

    return (
        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map(column => (
                                <TableCell
                                    key={column}
                                >
                                    {column}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, i) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                                    <TableCell >{row.move} </TableCell>
                                    <TableCell >{row.power} </TableCell>
                                    <TableCell >{row.accuracy} </TableCell>
                                    <TableCell >{row.pp} </TableCell>
                                    <TableCell >{row.type} </TableCell>
                                    <TableCell >{row.category} </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    );
}