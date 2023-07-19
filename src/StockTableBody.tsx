import React, { useEffect, useState } from 'react';
import CoinDashboard, {Coin} from './CoinDashboard';
import axios from 'axios';
import {
    TableBody,
  TableCell,
  TableRow,
} from '@mui/material';
import StockBodyRow from './StockBodyRow';
import { forEachChild } from 'typescript';
import { useStockController } from './hooks-helpers';
import BodySkeleton from './BodySkeleton';

export interface Stock {
    name: string;
    symbol: string;
    change: number;
    price: number;
    volume: number;
    avg_volume_for_3_month: number;
    percent_change: number;
    pe_ratio: number;
    marketCap: string;
  } 

  interface StockTableBodyProps {
    rowsPerPage: number;
    page: number;
    setDataLength: (length: number) => void;
  }

 export const StockTableBody: React.FC<StockTableBodyProps> = ({ rowsPerPage, page, setDataLength }) => {
    const { data, isLoading } = useStockController();
    const dataSliced = data.slice(page * rowsPerPage, (page + 1) * rowsPerPage);
  
    useEffect(() => {
      setDataLength(data.length);
    }, [data.length, setDataLength]);

      return (
        <TableBody>
            {isLoading ? (
            <BodySkeleton rows={rowsPerPage} heads={8} />
            ) : (
                dataSliced.map((stock) => (
                <StockBodyRow stock={stock}/>
            )
            ))
            }
        </TableBody>
      );
  }