import { TableRow, TableCell, Avatar, Box, Fade } from '@mui/material';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { numberFormat } from '../src/hooks-helpers';
import { Coin } from './CoinDashboard';
import SwitchTransition from 'react-transition-group/SwitchTransition';

interface BodyRowProps {
    coin: Coin;
  }

const BodyRow: React.FC<BodyRowProps> = ({ coin }) => {
  const price = numberFormat(coin.price);
  const percent_24 = parseFloat(coin.percentChange24h.toFixed(2));
  const percent_7d = parseFloat(coin.percentChange7d.toFixed(2));
  const marketCap = numberFormat(coin.marketCap, {
    notation: 'compact',
    compactDisplay: 'short',
  });
  const volume_24 = numberFormat(coin.volume24h);

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
        {coin.rank}
      </TableCell>
      <TableCell
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
          <Avatar
            src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${coin.id}.png`}
            sx={{
              width: 25,
              height: 25,
              mr: 1,
            }}
          />
          <span>
            {coin.name}&nbsp;{coin.symbol}
          </span>
        </Box>
      </TableCell>
      <SwitchTransition>
        <Fade key={price}>
          <TableCell align="right">{price}</TableCell>
        </Fade>
      </SwitchTransition>
      <SwitchTransition>
        <Fade key={percent_24}>
          <TableCell align="right">{renderPercentage(percent_24)}</TableCell>
        </Fade>
      </SwitchTransition>
      <SwitchTransition>
        <Fade key={percent_7d}>
          <TableCell align="right">{renderPercentage(percent_7d)}</TableCell>
        </Fade>
      </SwitchTransition>
      <TableCell align="right">{marketCap}</TableCell>
      <TableCell align="right">{volume_24}</TableCell>
    </TableRow>
  );
};

export default BodyRow;
