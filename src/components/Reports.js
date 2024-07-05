import React, { useState } from 'react';
import axios from 'axios';

function Reports() {
  const [reportType, setReportType] = useState('');
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({});

  const handleReportTypeChange = (type) => {
    setReportType(type);
    setData([]);
    setFilters({});
  };

  const handleInputChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const fetchData = async () => {
    let url = '';
    let params = {};

    switch (reportType) {
      case 'routes':
        url = '/api/reports/routes';
        params = { name: filters.name, description: filters.description };
        break;
      case 'points':
        url = '/api/reports/points';
        params = {
          latMin: filters.latMin,
          latMax: filters.latMax,
          longMin: filters.longMin,
          longMax: filters.longMax,
        };
        break;
      case 'segments':
        url = '/api/reports/segments';
        params = { routeId: filters.routeId };
        break;
      case 'connections':
        url = '/api/reports/connections';
        params = { transportType: filters.transportType };
        break;
      case 'activeRoutes':
        url = '/api/reports/activeRoutes';
        params = { minSegments: filters.minSegments };
        break;
      case 'trips':
        url = '/api/reports/trips';
        params = { startDate: filters.startDate, endDate: filters.endDate };
        break;
      case 'totalDistance':
        url = '/api/reports/totalDistance';
        params = { routeId: filters.routeId };
        break;
      case 'detailedRouteSegments':
        url = '/api/reports/detailedRouteSegments';
        params = { routeId: filters.routeId };
        break;
      default:
        return;
    }

    try {
      const response = await axios.get(url, { params });
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="reports-container">
      <h1 className="reports-title">Reports</h1>
      <div className="reports-menu">
        <button className="reports-button" onClick={() => handleReportTypeChange('routes')}>Routes</button>
        <button className="reports-button" onClick={() => handleReportTypeChange('points')}>Points</button>
        <button className="reports-button" onClick={() => handleReportTypeChange('segments')}>Segments</button>
        <button className="reports-button" onClick={() => handleReportTypeChange('connections')}>Connections</button>
        <button className="reports-button" onClick={() => handleReportTypeChange('activeRoutes')}>Active Routes</button>
        <button className="reports-button" onClick={() => handleReportTypeChange('trips')}>Trips</button>
        <button className="reports-button" onClick={() => handleReportTypeChange('totalDistance')}>Total Distance</button>
        <button className="reports-button" onClick={() => handleReportTypeChange('detailedRouteSegments')}>Detailed Route Segments</button>
      </div>

      <div className="reports-filters">
        {reportType === 'routes' && (
          <div className="reports-filter-group">
            <input className="reports-input" type="text" name="name" placeholder="Name" onChange={handleInputChange} />
            <input className="reports-input" type="text" name="description" placeholder="Description" onChange={handleInputChange} />
          </div>
        )}
        {reportType === 'points' && (
          <div className="reports-filter-group">
            <input className="reports-input" type="number" name="latMin" placeholder="Latitude Min" onChange={handleInputChange} />
            <input className="reports-input" type="number" name="latMax" placeholder="Latitude Max" onChange={handleInputChange} />
            <input className="reports-input" type="number" name="longMin" placeholder="Longitude Min" onChange={handleInputChange} />
            <input className="reports-input" type="number" name="longMax" placeholder="Longitude Max" onChange={handleInputChange} />
          </div>
        )}
        {reportType === 'segments' && (
          <div className="reports-filter-group">
            <input className="reports-input" type="number" name="routeId" placeholder="Route ID" onChange={handleInputChange} />
          </div>
        )}
        {reportType === 'connections' && (
          <div className="reports-filter-group">
            <input className="reports-input" type="text" name="transportType" placeholder="Transport Type" onChange={handleInputChange} />
          </div>
        )}
        {reportType === 'activeRoutes' && (
          <div className="reports-filter-group">
            <input className="reports-input" type="number" name="minSegments" placeholder="Min Segments" onChange={handleInputChange} />
          </div>
        )}
        {reportType === 'trips' && (
          <div className="reports-filter-group">
            <input className="reports-input" type="date" name="startDate" placeholder="Start Date" onChange={handleInputChange} />
            <input className="reports-input" type="date" name="endDate" placeholder="End Date" onChange={handleInputChange} />
          </div>
        )}
        {reportType === 'totalDistance' && (
          <div className="reports-filter-group">
            <input className="reports-input" type="number" name="routeId" placeholder="Route ID" onChange={handleInputChange} />
          </div>
        )}
        {reportType === 'detailedRouteSegments' && (
          <div className="reports-filter-group">
            <input className="reports-input" type="number" name="routeId" placeholder="Route ID" onChange={handleInputChange} />
          </div>
        )}
        <button className="reports-search-button" onClick={fetchData}>Search</button>
      </div>

      <div className="reports-results">
        <h2 className="reports-results-title">Results</h2>
        <pre className="reports-results-content">{JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>
  );
}

export default Reports;
