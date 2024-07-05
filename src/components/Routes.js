import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Routes() {
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const response = await axios.get('/api/routes'); // Ajuste conforme o endpoint do back-end
        setRoutes(response.data);
      } catch (error) {
        console.error('Error fetching routes:', error);
      }
    };

    fetchRoutes();
  }, []);

  return (
    <div>
      <h1>Routes</h1>
      <ul>
        {routes.map(route => (
          <li key={route.id}>
            {route.nome}: {route.descricao}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Routes;
