import { TableRow, TableCell, Avatar, Box, Fade } from '@mui/material';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { numberFormat } from '../src/hooks-helpers';
import SwitchTransition from 'react-transition-group/SwitchTransition';
import { Stock } from './StockTableBody';

interface StockBodyRowProps {
    stock: Stock;
  }

const StockBodyRow: React.FC<StockBodyRowProps> = ({ stock }) => {
  const price = numberFormat(stock.price);
  const percent_change = parseFloat(stock.percent_change.toFixed(2));

  const renderPercentage = (num: number) => {
    return num > 0 ? (
      <Box display="flex" justifyContent="flex-end" alignItems="center" color="success.main">
        <ArrowDropUpIcon color="success" />
        <span>{num}%</span>
      </Box>
    ) : (
      <Box display="flex" justifyContent="flex-end" alignItems="center" color="error.main">
        <ArrowDropDownIcon />
        <span> {num.toString().replace('-', '')}%</span>
      </Box>
    );
  };

  const renderValue = (num: number) => {
    return num > 0 ? (
      <Box display="flex" justifyContent="flex-end" alignItems="center" color="success.main">
        <ArrowDropUpIcon color="success" />
        <span>{num}</span>
      </Box>
    ) : (
      <Box display="flex" justifyContent="flex-end" alignItems="center" color="error.main">
        <ArrowDropDownIcon />
        <span> {num.toString().replace('-', '')}</span>
      </Box>
    );
  };

  return (
    <TableRow sx={{ '& td': { width: 20 } }}>
      <TableCell
        sx={(theme) => ({
          [theme.breakpoints.down('md')]: {
            position: 'sticky',
            left: 0,
            zIndex: 10,
            backgroundColor: '#121212',
          },
        })}
      >
        {stock.symbol}
      </TableCell>
      <TableCell
        colSpan={2}
        padding="none"
        sx={(theme) => ({
          [theme.breakpoints.down('md')]: {
            position: 'sticky',
            left: 48,
            zIndex: 10,
            backgroundColor: '#121212',
          },
        })}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <span>
            {stock.name}&nbsp;
          </span>
        </Box>
      </TableCell>
      <SwitchTransition>
        <Fade key={price}>
          <TableCell align="right">{price}</TableCell>
        </Fade>
      </SwitchTransition>
      <SwitchTransition>
          <TableCell align="right">{renderValue(stock.change)}</TableCell>
      </SwitchTransition>
      <SwitchTransition>
        <Fade key={percent_change}>
          <TableCell align="right">{renderPercentage(percent_change)}</TableCell>
        </Fade>
      </SwitchTransition>
      <TableCell align="right">{stock.avg_volume_for_3_month}</TableCell>
      <TableCell align="right">{stock.marketCap}</TableCell>
      <TableCell align="right">{stock.pe_ratio}</TableCell>
    </TableRow>
  );
};

export default StockBodyRow;
