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
import { useLogin } from './hook';
import { useNavigate } from 'react-router-dom';
import LandingLoader from '../../molecules/Loader';
import { Alert } from '@mui/material';


const theme = createTheme();

export default function Login() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    login()
  };
  const navigate = useNavigate()

  const { login,loading,email,password,setEmail,setPassword,error } = useLogin();
  const goToSignup = ()=> {
    navigate({ pathname: "/signup" })
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
            Log in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e)=>{setEmail(e.target.value)}}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e)=>{setPassword(e.target.value)}}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={()=>{login()}}
            >
              Log In
            </Button>
            <Grid container>
              <Grid item>
                <Button onClick={()=>{goToSignup()}}>
                  {"Don't have an account? Sign Up"}
                </Button>
              </Grid>
            </Grid>
          </Box>
          {error && <Alert severity="error" style={{width:'100%'}}>Invalid Credentials</Alert>}
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}