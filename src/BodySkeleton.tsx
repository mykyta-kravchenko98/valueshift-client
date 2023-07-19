import { Box, Skeleton, TableCell, TableRow } from '@mui/material';
import React from 'react';

interface BodySkeletonProps {
  rows: number;
  heads: number;
}

const BodySkeleton: React.FC<BodySkeletonProps> = ({ rows, heads }) => {
  const rowArray = Array(rows).fill(null);
  const cellArray = Array(heads).fill(null);
  return (
    <>
      {rowArray.map((_, rowIndex) => (
        <TableRow key={rowIndex}>
          {cellArray.map((_, cellIndex) => (
            <TableCell key={cellIndex} align={cellIndex === 1 ? 'left' : 'right'}>
              {cellIndex === 1 ? (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Skeleton variant="circular" width={25} height={25} sx={{ mr: 1 }} />
                  <Skeleton width={100} />
                </Box>
              ) : (
                <Skeleton />
              )}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
};

export default BodySkeleton;
