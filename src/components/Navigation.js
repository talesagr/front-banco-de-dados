import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css'

function Navigation() {
  return (
    <nav className="navigation">
      <ul className="navigation-menu">
        <li className="navigation-item">
          <NavLink to="/reports" className="navigation-link" activeClassName="active">Reports</NavLink>
        </li>
        <li className="navigation-item">
          <NavLink to="/connections" className="navigation-link" activeClassName="active">Connections</NavLink>
        </li>
        <li className="navigation-item">
          <NavLink to="/routes" className="navigation-link" activeClassName="active">Routes</NavLink>
        </li>
        <li className="navigation-item">
          <NavLink to="/points" className="navigation-link" activeClassName="active">Points</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
