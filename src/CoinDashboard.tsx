import React, { useEffect, useState } from 'react';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import {
  Paper,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import CoinTableBody from './CoinBody';

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
  return (
    <Paper>
      <TableContainer>
        <Table sx={{ minWidth: 700, '& td': { fontWeight: 600 } }}>
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
            <CoinTableBody/>
        </Table>
        </TableContainer>
    </Paper>
  );
};

export default CoinDashboard;
