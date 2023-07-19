import React, { useEffect, useState } from 'react';
import {
    TableBody,
} from '@mui/material';
import BodyRow from './BodyRow';
import { useCoinDataAPIWebSocket } from './hooks-helpers';
import BodySkeleton from './BodySkeleton';

interface CoinTableBodyProps {
    rowsPerPage: number;
    page: number;
    setDataLength: (length: number) => void;
  }

export const CoinTableBody: React.FC<CoinTableBodyProps> = ({ rowsPerPage, page, setDataLength }) => {
    const { data, isLoading } = useCoinDataAPIWebSocket();
    const dataSliced = data.slice(page * rowsPerPage, (page + 1) * rowsPerPage);

    useEffect(() => {
        setDataLength(data.length);
      }, [data.length, setDataLength]);

      return (
        <TableBody>
            {isLoading ? (
            <BodySkeleton rows={rowsPerPage} heads={7} />
            ) : (
                dataSliced.map((coin) => (
                <BodyRow coin={coin}/>
            )
            ))
            }
        </TableBody>
      );
  }