import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from "axios";

const instance = axios.create({
  baseURL: 'http://localhost:8080/api'
});

const Login = ({ setToken }) => {

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    instance.post('/admin/login',
      { "adminEmail": data.get("email"), "adminPassword": data.get("password") })
      .then(function (response) {
        setToken({token:"admin"});
      })
      .catch(function(response){
        console.log("not admin => " + response);
        
        instance.post('/student/login',
        { "studentEmail": data.get("email"), "studentPassword": data.get("password") })
        .then(function (response) {
          setToken({token:"student"});
        })
        .catch(function(response){
          console.log("not student => " + response);
          alert("The credentials do not match. Please try again");
        });
      });

  };

  return (
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
        <Avatar sx={{ m: 1, bgcolor: '#6c88c8' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="email"
            name="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>

        </Box>
      </Box>
    </Container>
  );
}

export default Login;