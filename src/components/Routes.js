import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Components.css'

function Routes() {
  const [routes, setRoutes] = useState([]);
  const [newRoute, setNewRoute] = useState({ nome: '', descricao: '' });
  const [updateRoute, setUpdateRoute] = useState({ id: '', nome: '', descricao: '' });

  const fetchRoutes = async () => {
    try {
      const response = await axios.get('/api/routes');
      setRoutes(response.data);
    } catch (error) {
      console.error('Error fetching routes:', error);
    }
  };

  useEffect(() => {
    fetchRoutes();
  }, []);

  const handleInputChange = (e, setFunction) => {
    setFunction(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const handleAddRoute = async () => {
    try {
      await axios.post('/api/routes', newRoute);
      fetchRoutes();
      setNewRoute({ nome: '', descricao: '' });
    } catch (error) {
      console.error('Error adding route:', error);
    }
  };

  const handleUpdateRoute = async () => {
    try {
      await axios.put(`/api/routes/${updateRoute.id}`, updateRoute);
      fetchRoutes();
      setUpdateRoute({ id: '', nome: '', descricao: '' });
    } catch (error) {
      console.error('Error updating route:', error);
    }
  };

  const handleDeleteRoute = async (id) => {
    try {
      await axios.delete(`/api/routes/${id}`);
      fetchRoutes();
    } catch (error) {
      console.error('Error deleting route:', error);
    }
  };

  return (
    <div className="routes-container">
      <h2>Routes</h2>

      <div className="routes-list">
        {routes.map(route => (
          <div key={route.rotaoid} className="route-item">
            <p>Nome: {route.nome}</p>
            <p>Descrição: {route.descricao}</p>
            <button onClick={() => handleDeleteRoute(route.rotaoid)}>Delete</button>
            <button onClick={() => setUpdateRoute({ id: route.rotaoid, nome: route.nome, descricao: route.descricao })}>Edit</button>
          </div>
        ))}
      </div>

      <div className="add-route">
        <h3>Add Route</h3>
        <input type="text" name="nome" placeholder="Nome" value={newRoute.nome} onChange={(e) => handleInputChange(e, setNewRoute)} />
        <input type="text" name="descricao" placeholder="Descrição" value={newRoute.descricao} onChange={(e) => handleInputChange(e, setNewRoute)} />
        <button onClick={handleAddRoute}>Add</button>
      </div>

      {updateRoute.id && (
        <div className="update-route">
          <h3>Update Route</h3>
          <input type="text" name="nome" placeholder="Nome" value={updateRoute.nome} onChange={(e) => handleInputChange(e, setUpdateRoute)} />
          <input type="text" name="descricao" placeholder="Descrição" value={updateRoute.descricao} onChange={(e) => handleInputChange(e, setUpdateRoute)} />
          <button onClick={handleUpdateRoute}>Update</button>
        </div>
      )}
    </div>
  );
}

export default Routes;
