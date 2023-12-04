import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Copyright from '../../molecules/Copyright';
import { useSignup } from './hook';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LandingLoader from '../../molecules/Loader';
import { Alert } from '@mui/material';



const theme = createTheme();

export default function Signup() {
  const { signUp, loading,error,errorMessage} = useSignup();
  const handleSubmit = (event:any) => {
    event.preventDefault();
    signUp({
      email_1,
      email_2,
      phone_1: mobile_1,
      phone_2: mobile_2,
      first_name: firstname,
      last_name: lastname,
      password,
      address,
      zip_code,
      city,
      state
    })
  };
  const navigate = useNavigate()
  const [email_1,setEmail1] = useState('');
  const [email_2,setEmail2] = useState('');
  const [password,setPassword] = useState('');
  const [mobile_1,setMobile1] = useState('');
  const [mobile_2,setMobile2] = useState('');
  const [firstname,setFirstName] = useState('');
  const [lastname,setLastName] = useState('');
  const [address,setAddress] = useState('');
  const [city,setCity] = useState('');
  const [state,setState] = useState('');
  const [zip_code,setZipCode] = useState('');

  const goToLogin = ()=> {
    navigate({ pathname: "/login" })
  }

  return (
    loading ? <LandingLoader/> :
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="fistName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  value={firstname}
                  onChange={(e)=>{setFirstName(e.target.value)}}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="LastName"
                  label="Last Name"
                  name="LastName"
                  autoComplete="family-name"
                  value={lastname}
                  onChange={(e)=>{setLastName(e.target.value)}}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email_1}
                  onChange={(e)=>{setEmail1(e.target.value)}}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="email2"
                  label="Email Address 2 (optional)"
                  name="email2"
                  autoComplete="email"
                  value={email_2}
                  onChange={(e)=>{setEmail2(e.target.value)}}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  id="phone1"
                  label="Phone Number"
                  name="phone1"
                  autoComplete="phone"
                  value={mobile_1}
                  onChange={(e)=>{setMobile1(e.target.value)}}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="phone2"
                  label="Phone Number 2 (optional)"
                  name="phone2"
                  autoComplete="email"
                  value={mobile_2}
                  onChange={(e)=>{setMobile2(e.target.value)}}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e)=>{setPassword(e.target.value)}}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="address"
                  label="Address (optional)"
                  type="text"
                  id="address"
                  value={address}
                  onChange={(e)=>{setAddress(e.target.value)}}
                />
              </Grid>
              <Grid container spacing={2} marginTop={1}>
              <Grid item xs={12} sm={4}>
                <TextField
                  name="city"
                  fullWidth
                  id="city"
                  label="City (optional)"
                  value={city}
                  onChange={(e)=>{setCity(e.target.value)}}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  id="State"
                  label="State (optional)"
                  name="state"
                  value={state}
                  onChange={(e)=>{setState(e.target.value)}}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  name="zipCode"
                  fullWidth
                  id="zipCode"
                  label="Zip Code (optional)"
                  value={zip_code}
                  onChange={(e)=>{setZipCode(e.target.value)}}
                  autoFocus
                />
              </Grid>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={(e)=>{ handleSubmit(e) }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
              <Button onClick={()=>{goToLogin()}}>
                  Already have an account? Sign in
                </Button>
              </Grid>
            </Grid>
          </Box>
          {error && <Alert severity="error" style={{width:'100%'}}>{errorMessage}</Alert>}
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}