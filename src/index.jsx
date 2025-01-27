import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import Maintenance from './Maintenance';

const maintenanceMode = false;

ReactDOM.render(
  <React.StrictMode>
    {maintenanceMode ? <Maintenance /> : <App />}
  </React.StrictMode>,
  document.getElementById('root'),
);
