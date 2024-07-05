import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Points() {
  const [points, setPoints] = useState([]);

  useEffect(() => {
    const fetchPoints = async () => {
      try {
        const response = await axios.get('/api/points'); // Ajuste conforme o endpoint do back-end
        setPoints(response.data);
      } catch (error) {
        console.error('Error fetching points:', error);
      }
    };

    fetchPoints();
  }, []);

  return (
    <div>
      <h1>Points</h1>
      <ul>
        {points.map(point => (
          <li key={point.id}>
            {point.nome}: {point.descricao}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Points;
