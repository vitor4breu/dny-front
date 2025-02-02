import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux/store';
import './styles/global.css';
import RouteManagement from './routeManegement';
import { StrictMode } from 'react';
import { ToastContainer } from 'react-toastify';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <StrictMode>
    <Provider store={store}>
      <RouteManagement />
    </Provider>
  </StrictMode>
);