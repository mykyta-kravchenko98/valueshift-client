import React, { useEffect, useState } from 'react';
import CoinDashboard, {Coin} from './CoinDashboard';
import {
    TableBody,
  TableCell,
  TableRow,
} from '@mui/material';
import BodyRow from './BodyRow';

interface CryptoCoinResponse {
	coins: Coin[];
}

export default function CoinTableBody() {
    const [coins, setCoins] = useState<Coin[]>([]);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0);
    const [dataLength, setDataLength] = useState(0);

    useEffect(() => {
        const socket = new WebSocket("ws://127.0.0.1:9070/websocket");
        
        socket.onopen = () => {
            console.log('connected')
        }

        socket.onmessage = (e) => {
            console.log('Received data');
            const data = JSON.parse(e.data) as CryptoCoinResponse;
            setCoins(data.coins);
        }

        return () => {
            console.log('close');
            socket.close()
        }
      }, []);    

      return (
        <TableBody>
            {coins.map((coin) => (
                <BodyRow coin={coin}/>
            ))}
        </TableBody>
      );
  }