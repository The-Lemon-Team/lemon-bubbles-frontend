import ReactDOM from 'react-dom/client';
import { App } from './App';

import { setupUtils } from './setupUtils';

import 'rsuite/dist/rsuite.min.css';
import './index.css';

setupUtils();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(<App />);
