import React, { useState, useEffect } from 'react';
import { Button, FormControl, Paper, TextField, IconButton, Autocomplete, Container  } from '@mui/material';
import axios from 'axios';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

export interface ConvertDto {
	input_currency_lable:string,
	output_currency_lable:string,
	value:number
}

const CurrencyConverterForm: React.FC = () => {
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [amount, setAmount] = useState(1.00);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [currencies, setCurrencies] = useState<string[]>([]);
  const [showResultFlag, setShowResultFlag] = useState(false)

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/v1/currency/list');
        console.log(response)
        setCurrencies(response.data.labels);
      } catch (error) {
        console.error('Error fetching currencies:', error);
      }
    };

    fetchCurrencies();
  }, []);

  const handleSwap = async () => {
    let from = fromCurrency
    setFromCurrency(toCurrency)
    setToCurrency(from)
    setShowResultFlag(false)
  }

  const handleConvert = async () => {
        const convertDto: ConvertDto = {
            input_currency_lable: fromCurrency,
            output_currency_lable: toCurrency,
            value: amount,
          };
        axios.post('http://127.0.0.1:8000/api/v1/convert', convertDto)
            .then(response => {
                setConvertedAmount(response.data)
                setShowResultFlag(true)
            })
            .catch((error: any) => {
                console.error(error);
              });
  };

  return (
        <Container maxWidth="md" sx={{ paddingTop: "5rem", paddingBottom: '5rem', paddingLeft: '5rem', paddingRight: '5rem' }}>
        <div style={{ display: 'flex', gap: '1rem' }}>

            <TextField
                required
                fullWidth
                label="Amount"
                type="number"
                value={amount}
                onChange={(e) => {
                    const value = parseFloat(e.target.value);
                    if (!isNaN(value)) {
                        setAmount(Number(value.toFixed(2)));
                        setShowResultFlag(false)
                    }
                  }}
                  inputProps={{
                    step: "0.01",
                    inputMode: "decimal",
                    pattern: "\\d+(\\.\\d{0,2})?"
                  }}
                sx={{ mb: 2 }}
            />

            <FormControl fullWidth sx={{ mb: 2 }}>
                <Autocomplete<string>
                    value={fromCurrency}
                    onChange={(event, newValue) => {
                        setFromCurrency(newValue || '');
                        setShowResultFlag(false)
                    }}
                    options={currencies}
                    renderInput={(params) => (
                    <TextField
                        {...params}
                        label="From Currency"
                        variant="outlined"
                        sx={{ height: '5rem' }}
                    />
                    )}
                    ListboxProps={{
                    style: { maxHeight: '10rem' },
                    }}
                />
            </FormControl>

            <IconButton 
                onClick={handleSwap}
                sx={{ width: '3rem', height: '3rem', borderRadius: '50%', border: '1px solid #f4f4f4', marginTop: '5px' }}>
                <SwapHorizIcon />
            </IconButton>

            <FormControl fullWidth sx={{ mb: 2 }}>
                <Autocomplete<string>
                    value={toCurrency}
                    onChange={(event, newValue) => {
                        setToCurrency(newValue || '');
                        setShowResultFlag(false)
                    }}
                    options={currencies}
                    renderInput={(params) => (
                    <TextField
                        {...params}
                        label="To Currency"
                        variant="outlined"
                        sx={{ height: '5rem' }}
                    />
                    )}
                    ListboxProps={{
                    style: { maxHeight: '10rem' },
                    }}
                />
            </FormControl>

        </div>
        <div style={{ display: 'flex', alignItems: 'center', height: '2rem' }}>
            {showResultFlag && (
            <div style={{ marginLeft: '1rem' }}>
                <p>
                {amount} {fromCurrency} = {convertedAmount.toFixed(2)} {toCurrency}
                </p>
            </div>
            )}

            <div style={{ marginLeft: 'auto' }}>
            <Button variant="contained" onClick={handleConvert}>
                Convert
            </Button>
            </div>
        </div>
        </Container>
  );
};

export default CurrencyConverterForm;
