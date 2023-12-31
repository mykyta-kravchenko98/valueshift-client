import React, { useEffect, useState } from 'react';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import {
  Paper,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import { CoinTableBody } from './CoinBody';

export interface Coin {
    id: number;
    name: string;
    symbol: string;
    rank: number;
    price: number;
    volume24h: number;
    volumeChange24h: number;
    percentChange1h: number;
    percentChange24h: number;
    percentChange7d: number;
    marketCap: number;
  }  

const CoinDashboard : React.FC = () => {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [dataLength, setDataLength] = useState(0);
  return (
    <Paper>
      <TableContainer sx={{ maxWidth: 'md', marginRight: '5rem' }}>
        <Table sx={{'& td': { fontWeight: 600 } }}>
          <TableHead>
          <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Name</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">24h %</TableCell>
              <TableCell align="right">7d %</TableCell>
              <TableCell align="right">Market Cap</TableCell>
              <TableCell align="right">Volume(24h)</TableCell>
            </TableRow>
          </TableHead>
            <CoinTableBody
            rowsPerPage={rowsPerPage}
            page={page}
            setDataLength={setDataLength}/>
        </Table>
        </TableContainer>
        <TablePagination
        component={'div'}
        rowsPerPageOptions={[5, 10, 20]}
        rowsPerPage={rowsPerPage}
        count={dataLength}
        onRowsPerPageChange={e => {
          setRowsPerPage(parseInt(e.target.value));
          setPage(0);
        }}
        page={page}
        onPageChange={(e, newPage) => {
          setPage(newPage);
        }}
      />
    </Paper>
  );
};

export default CoinDashboard;
