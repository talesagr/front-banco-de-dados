import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Components.css'

function Connections() {
  const [connections, setConnections] = useState([]);
  const [newConnection, setNewConnection] = useState({ pontooid_de: '', pontooid_para: '', distancia: '', tempo: '', tipo_transporte: '' });
  const [updateConnection, setUpdateConnection] = useState({ id: '', pontooid_de: '', pontooid_para: '', distancia: '', tempo: '', tipo_transporte: '' });

  const fetchConnections = async () => {
    try {
      const response = await axios.get('/api/connections');
      setConnections(response.data);
    } catch (error) {
      console.error('Error fetching connections:', error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  const handleInputChange = (e, setFunction) => {
    setFunction(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const handleAddConnection = async () => {
    try {
      await axios.post('/api/connections', newConnection);
      fetchConnections();
      setNewConnection({ pontooid_de: '', pontooid_para: '', distancia: '', tempo: '', tipo_transporte: '' });
    } catch (error) {
      console.error('Error adding connection:', error);
    }
  };

  const handleUpdateConnection = async () => {
    try {
      await axios.put(`/api/connections/${updateConnection.id}`, updateConnection);
      fetchConnections();
      setUpdateConnection({ id: '', pontooid_de: '', pontooid_para: '', distancia: '', tempo: '', tipo_transporte: '' });
    } catch (error) {
      console.error('Error updating connection:', error);
    }
  };

  const handleDeleteConnection = async (id) => {
    try {
      await axios.delete(`/api/connections/${id}`);
      fetchConnections();
    } catch (error) {
      console.error('Error deleting connection:', error);
    }
  };

  return (
    <div className="connections-container">
      <h2>Connections</h2>

      <div className="connections-list">
        {connections.map(connection => (
          <div key={connection.conexaooid} className="connection-item">
            <p>Ponto de: {connection.pontooid_de}</p>
            <p>Ponto para: {connection.pontooid_para}</p>
            <p>Distância: {connection.distancia}</p>
            <p>Tempo: {connection.tempo}</p>
            <p>Tipo de Transporte: {connection.tipo_transporte}</p>
            <button onClick={() => handleDeleteConnection(connection.conexaooid)}>Delete</button>
            <button onClick={() => setUpdateConnection({ id: connection.conexaooid, pontooid_de: connection.pontooid_de, pontooid_para: connection.pontooid_para, distancia: connection.distancia, tempo: connection.tempo, tipo_transporte: connection.tipo_transporte })}>Edit</button>
          </div>
        ))}
      </div>

      <div className="add-connection">
        <h3>Add Connection</h3>
        <input type="number" name="pontooid_de" placeholder="Ponto de ID" value={newConnection.pontooid_de} onChange={(e) => handleInputChange(e, setNewConnection)} />
        <input type="number" name="pontooid_para" placeholder="Ponto para ID" value={newConnection.pontooid_para} onChange={(e) => handleInputChange(e, setNewConnection)} />
        <input type="number" name="distancia" placeholder="Distância" value={newConnection.distancia} onChange={(e) => handleInputChange(e, setNewConnection)} />
        <input type="number" name="tempo" placeholder="Tempo" value={newConnection.tempo} onChange={(e) => handleInputChange(e, setNewConnection)} />
        <input type="text" name="tipo_transporte" placeholder="Tipo de Transporte" value={newConnection.tipo_transporte} onChange={(e) => handleInputChange(e, setNewConnection)} />
        <button onClick={handleAddConnection}>Add</button>
      </div>

      {updateConnection.id && (
        <div className="update-connection">
          <h3>Update Connection</h3>
          <input type="number" name="pontooid_de" placeholder="Ponto de ID" value={updateConnection.pontooid_de} onChange={(e) => handleInputChange(e, setUpdateConnection)} />
          <input type="number" name="pontooid_para" placeholder="Ponto para ID" value={updateConnection.pontooid_para} onChange={(e) => handleInputChange(e, setUpdateConnection)} />
          <input type="number" name="distancia" placeholder="Distância" value={updateConnection.distancia} onChange={(e) => handleInputChange(e, setUpdateConnection)} />
          <input type="number" name="tempo" placeholder="Tempo" value={updateConnection.tempo} onChange={(e) => handleInputChange(e, setUpdateConnection)} />
          <input type="text" name="tipo_transporte" placeholder="Tipo de Transporte" value={updateConnection.tipo_transporte} onChange={(e) => handleInputChange(e, setUpdateConnection)} />
          <button onClick={handleUpdateConnection}>Update</button>
        </div>
      )}
    </div>
  );
}

export default Connections;
