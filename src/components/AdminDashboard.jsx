import React, { useState, useEffect } from 'react';
    import { useNavigate } from 'react-router-dom';
    import {
      AppBar,
      Toolbar,
      Typography,
      Button,
      Container,
      Grid,
      TextField,
      Paper,
      List,
      ListItem,
      ListItemText,
      ListItemSecondaryAction,
      IconButton,
      Dialog,
      DialogActions,
      DialogContent,
      DialogTitle,
      Alert,
    } from '@mui/material';
    import DeleteIcon from '@mui/icons-material/Delete';
    import {
      CreateUser,
      ListUsers,
      DeleteUser,
      SendEmail,
    } from '../utils/aws-api';

    const AdminDashboard = ({ onLogout }) => {
      const navigate = useNavigate();
      const [users, setUsers] = useState([]);
      const [newUsername, setNewUsername] = useState('');
      const [newPassword, setNewPassword] = useState('');
      const [createUserError, setCreateUserError] = useState('');
      const [deleteUserError, setDeleteUserError] = useState('');
      const [openDialog, setOpenDialog] = useState(false);
      const [selectedUserToDelete, setSelectedUserToDelete] = useState(null);
      const [email, setEmail] = useState('');
      const [subject, setSubject] = useState('');
      const [body, setBody] = useState('');
      const [emailError, setEmailError] = useState('');

      useEffect(() => {
        fetchUsers();
      }, []);

      const fetchUsers = async () => {
        try {
          const userList = await ListUsers();
          setUsers(userList);
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      };

      const handleCreateUser = async () => {
        setCreateUserError('');
        if (!newUsername || !newPassword) {
          setCreateUserError('Username and password are required.');
          return;
        }

        try {
          await CreateUser(newUsername, newPassword);
          setNewUsername('');
          setNewPassword('');
          fetchUsers();
        } catch (error) {
          console.error('Error creating user:', error);
          setCreateUserError(`Failed to create user: ${error.message}`);
        }
      };

      const handleDeleteUser = async () => {
        setDeleteUserError('');
        try {
          await DeleteUser(selectedUserToDelete);
          fetchUsers();
          handleCloseDialog();
        } catch (error) {
          console.error('Error deleting user:', error);
          setDeleteUserError(`Failed to delete user: ${error.message}`);
        }
      };

      const handleOpenDialog = (username) => {
        setSelectedUserToDelete(username);
        setOpenDialog(true);
      };

      const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedUserToDelete(null);
      };

      const handleSendEmail = async () => {
        setEmailError('');
        if (!email || !subject || !body) {
          setEmailError('Email, subject, and body are required.');
          return;
        }

        try {
          await SendEmail(email, subject, body);
          setEmail('');
          setSubject('');
          setBody('');
          alert('Email sent successfully!');
        } catch (error) {
          console.error('Error sending email:', error);
          setEmailError(`Failed to send email: ${error.message}`);
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
                Admin Dashboard
              </Typography>
              <Button color="inherit" onClick={handleLogoutClick}>Logout</Button>
            </Toolbar>
          </AppBar>
          <Container style={{ marginTop: '20px' }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Paper elevation={3} style={{ padding: '20px' }}>
                  <Typography variant="h6" gutterBottom>
                    Create New User
                  </Typography>
                  {createUserError && <Alert severity="error">{createUserError}</Alert>}
                  <TextField
                    label="Username"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                  />
                  <TextField
                    label="Password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <Button variant="contained" color="primary" onClick={handleCreateUser}>
                    Create User
                  </Button>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper elevation={3} style={{ padding: '20px' }}>
                  <Typography variant="h6" gutterBottom>
                    User List
                  </Typography>
                  {deleteUserError && <Alert severity="error">{deleteUserError}</Alert>}
                  <List>
                    {users.map((user) => (
                      <ListItem key={user.Username}>
                        <ListItemText primary={user.Username} />
                        <ListItemSecondaryAction>
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => handleOpenDialog(user.Username)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper elevation={3} style={{ padding: '20px' }}>
                  <Typography variant="h6" gutterBottom>
                    Send Email
                  </Typography>
                  {emailError && <Alert severity="error">{emailError}</Alert>}
                  <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <TextField
                    label="Subject"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  />
                  <TextField
                    label="Body"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    multiline
                    rows={4}
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                  />
                  <Button variant="contained" color="primary" onClick={handleSendEmail}>
                    Send Email
                  </Button>
                </Paper>
              </Grid>
            </Grid>
          </Container>

          <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle>Delete User</DialogTitle>
            <DialogContent>
              Are you sure you want to delete user: {selectedUserToDelete}?
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="primary">
                Cancel
              </Button>
              <Button onClick={handleDeleteUser} color="primary">
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </>
      );
    };

    export default AdminDashboard;
