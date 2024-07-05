import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Navigation from './components/Navigation'
import Reports from './components/Reports'
import Connections from './components/Connections'
import RoutesComponent from './components/Routes'
import Points from './components/Points'
import './App.css'

function App() {
  return (
    <div className='App'>
      <Navigation />
      <Routes>
        <Route path='/reports' Component={Reports} />
        <Route path='/connections' Component={Connections} />
        <Route path='/routes' Component={RoutesComponent} />
        <Route path='/points' Component={Points} />
        <Route exact path='/' Component={Reports} />
      </Routes>
    </div>
  )
}

export default App;