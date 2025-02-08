import React, { useState, useEffect } from 'react';
    import { useNavigate } from 'react-router-dom';
    import {
      AppBar,
      Toolbar,
      Typography,
      Button,
      Container,
      Paper,
      TextField,
      Grid,
      Alert,
    } from '@mui/material';
    import { RequestPermission } from '../utils/aws-api';

    const UserDashboard = ({ onLogout }) => {
      const navigate = useNavigate();
      const [permissionRequest, setPermissionRequest] = useState('');
      const [requestStatus, setRequestStatus] = useState('');
      const [requestError, setRequestError] = useState('');

      useEffect(() => {
        // In a real application, you would fetch the request status from a database or API
        // For this example, we'll just set a default status
        setRequestStatus('Pending');
      }, []);

      const handleRequestPermission = async () => {
        setRequestError('');
        if (!permissionRequest) {
          setRequestError('Permission request is required.');
          return;
        }

        try {
          await RequestPermission(permissionRequest);
          setRequestStatus('Pending');
          alert('Permission request submitted successfully!');
        } catch (error) {
          console.error('Error requesting permission:', error);
          setRequestError(`Failed to request permission: ${error.message}`);
        }
      };

      const handleLogoutClick = () => {
        onLogout();
        navigate('/login');
      };

      return (
        <>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" style={{ flexGrow: 1 }}>
                User Dashboard
              </Typography>
              <Button color="inherit" onClick={handleLogoutClick}>Logout</Button>
            </Toolbar>
          </AppBar>
          <Container style={{ marginTop: '20px' }}>
            <Grid container justifyContent="center">
              <Grid item xs={12} md={8}>
                <Paper elevation={3} style={{ padding: '20px' }}>
                  <Typography variant="h6" gutterBottom>
                    Request Additional Permissions
                  </Typography>
                  {requestError && <Alert severity="error">{requestError}</Alert>}
                  <TextField
                    label="Permission Request"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    multiline
                    rows={4}
                    value={permissionRequest}
                    onChange={(e) => setPermissionRequest(e.target.value)}
                  />
                  <Button variant="contained" color="primary" onClick={handleRequestPermission}>
                    Request Permission
                  </Button>
                  <Typography variant="subtitle1" style={{ marginTop: '20px' }}>
                    Request Status: {requestStatus}
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </>
      );
    };

    export default UserDashboard;
