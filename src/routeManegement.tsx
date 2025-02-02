import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './utils/auth/authContext';
import Login from './pages/Login';
import ProtectedRoute from './utils/auth/ProtectedRoute';
import HomePage from './layout/HomePage';
import InternalRoutes from './internalRoutes';

const theme = createTheme({
  palette: {
    background: {
      default: "#fbfbfb"
    },
    primary: {
      main: "#FACE83"
    },
    text: {
      primary: "#333333",
    }
  },
  shape: {
    borderRadius: 11
  },
  typography: {
    fontFamily: "Centhury Gotic",
    subtitle2: {
      fontFamily: "Inter",
      fontWeight: "lighter",
      color: "#333333"
    }
  },
  components: {
    MuiButton: {
      
      variants:[
        {
          props: { variant: 'contained', color: 'secondary' },
          style: {
            border: "1.5px solid #ffb73c",
            letterSpacing:"0.1em",
            paddingLeft: "7px",
            paddingRight: "7px",
            color: "#ffb73c",
            backgroundColor: "#ffffff",
            boxShadow: "none",
            fontWeight: "bold",
          }
        },
        {
          props: { variant: 'contained', color: 'secondary', disabled: true },
          style: {
            border: "none",
          }
        }
      ],
      styleOverrides: {
        root: {
          ":hover": {
            backgroundColor: "rgb(255 207 123 / 19%)"
          }
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        sizeSmall: {
          fontSize: "0.9rem",
          lineHeight: "1.5"
        }
      }
    },
    MuiInputBase: {
      styleOverrides: {
        inputSizeSmall: {
          fontSize: "0.9rem !important",
        }
      }
    },
    MuiTextField: {
      defaultProps: {
        size: "small"
      },
      styleOverrides: {
        root: {
          fontSize: "0.9rem !important",
        }
      }
    }
  }
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const RouteManagement: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <CssBaseline/>
        <AuthProvider>
          <Router>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<ProtectedRoute />}>
                <Route path="*" element={
                  <HomePage>
                    <InternalRoutes />
                  </HomePage>
                } />
              </Route>
            </Routes>
          </Router>
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default RouteManagement;