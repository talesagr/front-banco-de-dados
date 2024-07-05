import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Connections() {
  const [connections, setConnections] = useState([]);

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const response = await axios.get('/api/connections'); // Ajuste conforme o endpoint do back-end
        setConnections(response.data);
      } catch (error) {
        console.error('Error fetching connections:', error);
      }
    };

    fetchConnections();
  }, []);

  return (
    <div>
      <h1>Connections</h1>
      <ul>
        {connections.map(connection => (
          <li key={connection.id}>
            {connection.pontooid_de} - {connection.pontooid_para}: {connection.tipo_transporte}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Connections;
