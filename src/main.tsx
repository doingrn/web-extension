import '@/styles/index.css';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

const root = document.createElement('div');
root.id = 'crx-root';

document.body.append(root);
ReactDOM.createRoot(root).render(<App />);
