import React, { useState, useEffect } from 'react';
    import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
    import AdminDashboard from './components/AdminDashboard';
    import UserDashboard from './components/UserDashboard';
    import Login from './components/Login';
    import { checkAuth } from './utils/auth';
    import { ThemeProvider, createTheme } from '@mui/material/styles';
    import CssBaseline from '@mui/material/CssBaseline';

    const darkTheme = createTheme({
      palette: {
        mode: 'dark',
        primary: {
          main: '#64b5f6', // Blue accent
        },
        secondary: {
          main: '#f48fb1',
        },
        background: {
          default: '#181818', // Dark gray background
          paper: 'rgba(33, 33, 33, 0.8)', // Translucent paper background
        },
        text: {
          primary: '#e0e0e0', // Light gray text
        },
      },
      components: {
        MuiCssBaseline: {
          styleOverrides: {
            body: {
              background: 'linear-gradient(to bottom, #121212, #1e1e1e)', // Dark gradient background
              color: '#e0e0e0',
              overflow: 'hidden', /* Hide scrollbars */
            },
          },
        },
        MuiPaper: {
          styleOverrides: {
            root: {
              backgroundColor: 'rgba(33, 33, 33, 0.8)', // Translucent paper background
              color: '#e0e0e0',
              border: '1px solid #303030', // Subtle border
              backdropFilter: 'blur(5px)', // Apply blur effect
            },
            elevation3: {
              boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)', // Subtle glow effect
            },
          },
        },
        MuiInputBase: {
          styleOverrides: {
            root: {
              color: '#e0e0e0',
            },
          },
        },
        MuiOutlinedInput: {
          styleOverrides: {
            notchedOutline: {
              borderColor: 'rgba(48, 48, 48, 0.5)', // Translucent border
            },
          },
        },
        MuiButton: {
          styleOverrides: {
            containedPrimary: {
              background: 'linear-gradient(to right, #42a5f5, #64b5f6)', // Gradient button
              color: '#fff',
              border: 'none', // Remove default border
              '&:hover': {
                background: 'linear-gradient(to right, #64b5f6, #90caf9)',
              },
            },
          },
        },
        MuiListItem: {
          styleOverrides: {
            root: {
              color: '#e0e0e0',
            },
          },
        },
        MuiAppBar: {
          styleOverrides: {
            root: {
              backgroundColor: 'rgba(33, 33, 33, 0.8)', // Translucent app bar
              backdropFilter: 'blur(5px)', // Apply blur effect
            },
          },
        },
      },
    });

    function App() {
      const [isAuthenticated, setIsAuthenticated] = useState(false);
      const [userRole, setUserRole] = useState(null);

      useEffect(() => {
        const authData = checkAuth();
        setIsAuthenticated(authData.isAuthenticated);
        setUserRole(authData.role);
      }, []);

      const handleLogin = (role) => {
        setIsAuthenticated(true);
        setUserRole(role);
        localStorage.setItem('userRole', role);
        localStorage.setItem('isAuthenticated', 'true');
      };

      const handleLogout = () => {
        setIsAuthenticated(false);
        setUserRole(null);
        localStorage.removeItem('userRole');
        localStorage.removeItem('isAuthenticated');
      };

      return (
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Router>
            <Routes>
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
              <Route
                path="/admin"
                element={
                  isAuthenticated && userRole === 'admin' ? (
                    <AdminDashboard onLogout={handleLogout} />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route
                path="/user"
                element={
                  isAuthenticated && userRole === 'user' ? (
                    <UserDashboard onLogout={handleLogout} />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route path="/" element={<Navigate to="/login" />} />
            </Routes>
          </Router>
        </ThemeProvider>
      );
    }

    export default App;
