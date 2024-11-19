import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import MainLayout from './mainLayout';
import Login from './pages/Login';
import ProtectedRoute from './auth/ProtectedRoute';
import HomePage from './components/Layout/HomePage';
import { AuthProvider } from './auth/authContext';



const App: React.FC = () => {
  const theme = createTheme(
    {palette: {
      primary: {
        main: "#FACE83"
      },
      text: {
        primary: "#333333",
      }
    },
  shape: {
    borderRadius: 11
  }, typography: {
    fontFamily: "Centhury Gotic"
  }
}
  );

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider >
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />

            <Route
              path="*"
              element={<ProtectedRoute/>}>
              <Route path="*" element={
              <HomePage>
                <MainLayout />
              </HomePage>} />

            </Route>
            

          </Routes>
          
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;