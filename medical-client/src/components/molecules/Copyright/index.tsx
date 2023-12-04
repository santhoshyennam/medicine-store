import { Link, Typography } from "@mui/material";
import React from 'react';


export default function Copyright(props: any) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="http://ec2-18-117-153-42.us-east-2.compute.amazonaws.com/">
          Medicine Store
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }