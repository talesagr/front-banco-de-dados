import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Components.css'

function Points() {
  const [points, setPoints] = useState([]);
  const [newPoint, setNewPoint] = useState({ latitude: '', longitude: '', nome: '', descricao: '' });
  const [updatePoint, setUpdatePoint] = useState({ id: '', latitude: '', longitude: '', nome: '', descricao: '' });

  const fetchPoints = async () => {
    try {
      const response = await axios.get('/api/points');
      setPoints(response.data);
    } catch (error) {
      console.error('Error fetching points:', error);
    }
  };

  useEffect(() => {
    fetchPoints();
  }, []);

  const handleInputChange = (e, setFunction) => {
    setFunction(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const handleAddPoint = async () => {
    try {
      await axios.post('/api/points', newPoint);
      fetchPoints();
      setNewPoint({ latitude: '', longitude: '', nome: '', descricao: '' });
    } catch (error) {
      console.error('Error adding point:', error);
    }
  };

  const handleUpdatePoint = async () => {
    try {
      await axios.put(`/api/points/${updatePoint.id}`, updatePoint);
      fetchPoints();
      setUpdatePoint({ id: '', latitude: '', longitude: '', nome: '', descricao: '' });
    } catch (error) {
      console.error('Error updating point:', error);
    }
  };

  const handleDeletePoint = async (id) => {
    try {
      await axios.delete(`/api/points/${id}`);
      fetchPoints();
    } catch (error) {
      console.error('Error deleting point:', error);
    }
  };

  return (
    <div className="points-container">
      <h2>Points</h2>

      <div className="points-list">
        {points.map(point => (
          <div key={point.pontooid} className="point-item">
            <p>Nome: {point.nome}</p>
            <p>Latitude: {point.latitude}</p>
            <p>Longitude: {point.longitude}</p>
            <p>Descrição: {point.descricao}</p>
            <button onClick={() => handleDeletePoint(point.pontooid)}>Delete</button>
            <button onClick={() => setUpdatePoint({ id: point.pontooid, latitude: point.latitude, longitude: point.longitude, nome: point.nome, descricao: point.descricao })}>Edit</button>
          </div>
        ))}
      </div>

      <div className="add-point">
        <h3>Add Point</h3>
        <input type="number" name="latitude" placeholder="Latitude" value={newPoint.latitude} onChange={(e) => handleInputChange(e, setNewPoint)} />
        <input type="number" name="longitude" placeholder="Longitude" value={newPoint.longitude} onChange={(e) => handleInputChange(e, setNewPoint)} />
        <input type="text" name="nome" placeholder="Nome" value={newPoint.nome} onChange={(e) => handleInputChange(e, setNewPoint)} />
        <input type="text" name="descricao" placeholder="Descrição" value={newPoint.descricao} onChange={(e) => handleInputChange(e, setNewPoint)} />
        <button onClick={handleAddPoint}>Add</button>
      </div>

      {updatePoint.id && (
        <div className="update-point">
          <h3>Update Point</h3>
          <input type="number" name="latitude" placeholder="Latitude" value={updatePoint.latitude} onChange={(e) => handleInputChange(e, setUpdatePoint)} />
          <input type="number" name="longitude" placeholder="Longitude" value={updatePoint.longitude} onChange={(e) => handleInputChange(e, setUpdatePoint)} />
          <input type="text" name="nome" placeholder="Nome" value={updatePoint.nome} onChange={(e) => handleInputChange(e, setUpdatePoint)} />
          <input type="text" name="descricao" placeholder="Descrição" value={updatePoint.descricao} onChange={(e) => handleInputChange(e, setUpdatePoint)} />
          <button onClick={handleUpdatePoint}>Update</button>
        </div>
      )}
    </div>
  );
}

export default Points;
