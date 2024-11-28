import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

interface CircularProgressProps{
  loaderColor: string,
  loaderSize: number,
}

const  CircularIndeterminate: React.FC<CircularProgressProps> = ({loaderColor , loaderSize}) => {
  return (
    <CircularProgress size={loaderSize} style={{ color: loaderColor }} />
  );
}
export default CircularIndeterminate