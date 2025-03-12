import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import Maintenance from './Maintenance';

import Providers from './Providers';

const maintenanceMode = false;

ReactDOM.render(
  <React.StrictMode>
    <Providers>
      {maintenanceMode ? <Maintenance /> : <App />}
    </Providers>
  </React.StrictMode>,
  document.getElementById('root'),
);
