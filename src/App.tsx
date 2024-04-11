import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import NotFound from './Pages/404';
import Dashboard from './Pages/Dashboard';
import Assets from './components/DashboardAssets';
import Settings from './components/DashboardSettings';

function App() {
  return (
    <div className="App">
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      {/*<NavigationBar />
      <br/>*/}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login user={null} onLogin={()=>{}}/>} />
        {/* Dashboard: nested routes */}
        <Route path='/dashboard' element={<Dashboard />}>
          <Route path='/dashboard/assets' element={<Assets />} />
          <Route path='/dashboard/settings' element={<Settings />}/>
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
