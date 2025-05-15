import { useEffect, useState } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return (window.location.href = '/login');

    const decoded = jwtDecode(token);
    setUser(decoded);

    axios
      .get('http://localhost:3000/api/checklists', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Bem-vindo, {user?.email}</h1>
      <p>Aqui vai a lista de checklists...</p>
    </div>
  );
}
