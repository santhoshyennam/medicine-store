import React from 'react';
import { CircularProgress } from '@mui/material';


const LandingLoader: React.FC<{}> = () => {

  return (
    <CircularProgress color="inherit" style={{marginTop:'60px'}} />
  );
};

export default LandingLoader;
