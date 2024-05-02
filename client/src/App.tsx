import { FC } from 'react';

import './App.css';
import Providers from './Providers';
import Router from './routes';


const App: FC = () => {
  return (
    <Providers>
      <Router />
    </Providers>
  );
}

export default App;
