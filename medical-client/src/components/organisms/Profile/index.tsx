import * as React from 'react';
import { Grid, Paper, TextField, Typography } from '@mui/material';
import { useProfile } from './hook';
import LandingLoader from '../../molecules/Loader';

export default function Profile(props:any) {
  
    const { user } = useProfile()
    return (
        user  ? 
        <Grid container spacing={4}  display={"inline"}>
                <Typography variant="subtitle1" sx={{ fontWeight:'8px', fontSize: '24px',marginLeft:'10px', marginTop: 1,alignContent:'start',marginBottom:'40px' }}>
                    My Details
                </Typography>
                <Paper elevation={3} sx={{ padding: 10,width:'80%',marginTop:'10px',marginLeft:'60px' }}>
                    <TextField disabled id="outlined-disabled"  label="First Name" defaultValue={user.first_name} sx={{ width: '70%',marginBottom:'20px',color: '#7f7f7f' }} />
                    <TextField disabled id="outlined-disabled" label="Last Name" defaultValue={user.last_name} sx={{ width: '70%',marginBottom:'20px' }} />
                    <TextField disabled id="outlined-disabled" label="Email 1" defaultValue={user.email_1} sx={{ width: '70%',marginBottom:'20px' }} />
                    {user.email_2 && <TextField disabled id="outlined-disabled" label="Email 2" defaultValue={user.email_2} sx={{ width: '70%',marginBottom:'20px' }} />}
                    <TextField disabled id="outlined-disabled" label="Phone Number 1" defaultValue={user.phone_1} sx={{ width: '70%',marginBottom:'20px' }} />
                    {user.phone_2 && <TextField disabled id="outlined-disabled" label="Phone Number 2" defaultValue={user.phone_2} sx={{ width: '70%',marginBottom:'20px' }} />}
                    {user.address && <TextField disabled id="outlined-disabled" label="Address" defaultValue={user.address} sx={{ width: '70%',marginBottom:'20px' }} />}
                    {user.city && <TextField disabled id="outlined-disabled" label="City" defaultValue={user.city} sx={{ width: '70%',marginBottom:'20px' }} />}
                    {user.zip_code && <TextField disabled id="outlined-disabled" label="Zipcode" defaultValue={user.zip_code} sx={{ width: '70%',marginBottom:'20px' }} />}
                </Paper>
        </Grid>
        : <LandingLoader/>
    );
}