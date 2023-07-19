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
import { StockTableBody } from './StockTableBody';

const CoinDashboard : React.FC = () => {
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0);
    const [dataLength, setDataLength] = useState(0);
  return (
    <Paper>
      <TableContainer sx={{ marginRight: '5rem' }}>
        <Table sx={{minWidth: 860, '& td': { fontWeight: 600 } }}>
          <TableHead>
          <TableRow>
              <TableCell>Symbol</TableCell>
              <TableCell colSpan={2}>Name</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Change</TableCell>
              <TableCell sx={{ width: '11%' }} align="right">% Change</TableCell>
              <TableCell sx={{ width: '10%' }} align="right">Avg Vol(3 month)</TableCell>
              <TableCell align="right">Market Cap</TableCell>
              <TableCell sx={{ width: '15%' }} align="right">PE Ratio(TTM)</TableCell>
            </TableRow>
          </TableHead>
            <StockTableBody
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
