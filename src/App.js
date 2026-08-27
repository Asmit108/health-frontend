import Dashboard from './Components/Dashboard';
import Login from './Components/Login';
import Register from './Components/Register';
import { useEffect, useState } from 'react';

function App() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => setPath(window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  if (path === '/register' || path === '/') return <Register />;
  if (path === '/dashboard') return <Dashboard />;
  return <Login />;
}

export default App;
