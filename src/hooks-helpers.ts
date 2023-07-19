import { useEffect, useState } from 'react';
import { Stock } from './StockTableBody';
import axios from 'axios';
import { Coin } from './CoinDashboard';

export function numberFormat(num: number, options?: Intl.NumberFormatOptions): string {
    let temp = 2;
    if (num < 1 && num > 0.0001) {
      temp = 4;
    }
    if (num < 0.0001) {
      temp = 8;
    }
    let defaultOptions: Intl.NumberFormatOptions = {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: temp,
      minimumFractionDigits: 2,
      notation: 'standard',
      compactDisplay: 'long',
    };
    return new Intl.NumberFormat('en-US', { ...defaultOptions, ...options }).format(num);
  }
  
  export interface StockControllerState {
    data: Stock[];
    isLoading: boolean;
  }
  
  export function useStockController(): StockControllerState {
    const [state, setState] = useState<StockControllerState>({ data: [], isLoading: true });
  
    const updateState = (data: Stock[] | null) => {
      setState((prevState) => ({
        data: data ? data : prevState.data,
        isLoading: false,
      }));
    };
  
    async function init() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/v1/stock/all');
        updateState(response.data);
      } catch (err) {
        console.log(err);
      }
    }
  
    useEffect(() => {
      init();
    }, []);
  
    return state;
  }

  export interface CoinDataAPIWebSocketState {
    data: Coin[];
    isLoading: boolean;
  }

  interface CryptoCoinResponse {
    coins: Coin[];
  }
  
  export function useCoinDataAPIWebSocket(): CoinDataAPIWebSocketState {
    const [state, setState] = useState<CoinDataAPIWebSocketState>({ data: [], isLoading: true });
  
    const updateState = (data: Coin[] | null) => {
      setState((prevState) => ({
        data: data ? data : prevState.data,
        isLoading: false,
      }));
    };
  
    useEffect(() => {
      const socket = new WebSocket("ws://127.0.0.1:9070/websocket");
      
      socket.onopen = () => {
          console.log('connected')
      }

      socket.onmessage = (e) => {
          console.log('Received data');
          const data = JSON.parse(e.data) as CryptoCoinResponse;
          updateState(data.coins);
      }

      return () => {
          console.log('close');
          socket.close()
      }
    }, []);    
  
    return state;
  }


  export default numberFormat;
  