import React, { useState } from 'react';
    import { useNavigate } from 'react-router-dom';
    import {
      TextField,
      Button,
      Grid,
      Paper,
      Typography,
      Alert,
    } from '@mui/material';

    const Login = ({ onLogin }) => {
      const [username, setUsername] = useState('');
      const [password, setPassword] = useState('');
      const [error, setError] = useState('');
      const navigate = useNavigate();

      const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        if (username === 'admin' && password === 'admin') {
          onLogin('admin');
          navigate('/admin');
        } else if (username === 'user' && password === 'user') {
          onLogin('user');
          navigate('/user');
        } else {
          setError('Invalid credentials');
        }
      };

      return (
        <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
          <Grid item xs={12} sm={8} md={6} lg={4}>
            <Paper elevation={3} style={{ padding: '20px' }}>
              <Typography variant="h5" align="center" gutterBottom>
                Login
              </Typography>
              {error && <Alert severity="error">{error}</Alert>}
              <form onSubmit={handleSubmit}>
                <TextField
                  label="Username"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                  label="Password"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                  Login
                </Button>
              </form>
            </Paper>
          </Grid>
        </Grid>
      );
    };

    export default Login;
