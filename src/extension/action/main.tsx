import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import UserProvider from './providers/user-provider.tsx';
import './styles/index.css';

const root = document.createElement('div');
root.id = 'crx-root';

document.body.append(root);
ReactDOM.createRoot(root).render(
  <UserProvider>
    <App />
  </UserProvider>
);
