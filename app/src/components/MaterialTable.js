import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const options = {
    year: 'numeric', month: 'numeric', day: 'numeric',
    hour: 'numeric', minute: 'numeric', second: 'numeric',
    hour12: false,
    timeZone: "America/Sao_Paulo"
  };

function formatDate(date) {
    
    let correctDateFormat = new Date(date);
    
    return correctDateFormat = new Intl.DateTimeFormat('pt-BR', options).format(correctDateFormat)
}


function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (

        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.id}
                </TableCell>
                <TableCell align="right">{row.clientName}</TableCell>
                <TableCell align="right">{row.clientEmail}</TableCell>
                <TableCell align="right">{row.clientAdress}</TableCell>
                <TableCell align="right">{formatDate(row.createdAt)}</TableCell>
                <TableCell align="right">{row.totalBRL}</TableCell>
                <TableCell align="right">{row.totalUSD}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Produtos
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Nome do produto</TableCell>
                                        <TableCell>Valor do produto</TableCell>
                                        <TableCell align="right">Quantidade</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.products.map((productRow) => (
                                        <TableRow key={productRow.id}>
                                            <TableCell component="th" scope="row">
                                                {productRow.productName}
                                            </TableCell>
                                            <TableCell>{productRow.productValue}</TableCell>
                                            <TableCell align="right">{productRow.productQuantity}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}


export default function CollapsibleTable(props) {

const rows = props.data

    return (
        <TableContainer component={Paper} style={{
            display: 'flex',
            alignItems: 'center',
            height: '100vh'
        }}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>Checkout nº</TableCell>
                        <TableCell align="right">Cliente</TableCell>
                        <TableCell align="right">Email do cliente</TableCell>
                        <TableCell align="right">Endereço do cliente</TableCell>
                        <TableCell align="right">Data / Hora da venda</TableCell>
                        <TableCell align="right">Total (BRL)</TableCell>
                        <TableCell align="right">Total (USD)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <Row key={row.id} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}