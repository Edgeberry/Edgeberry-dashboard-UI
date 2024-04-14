import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import NotFound from './Pages/404';
import Dashboard from './Pages/Dashboard';
import Assets from './components/DashboardAssets';
import Settings from './components/DashboardSettings';
import { api_user_getAuthenticatedUser } from './api/user';
import { useEffect, useState } from 'react';
import Logout from './Pages/Logout';

function App() {
  const[ user, setUser ] = useState<any|null>(null);
  const[ loading, setLoading ] = useState<boolean>(true);

  useEffect(()=>{
    onLogin();
  },[])

  // on a successful login event
  async function onLogin(){
    setLoading(true);
    // fetch the logged in user
    const result = await api_user_getAuthenticatedUser();
    if( !result.message) setUser(result);
    else setUser(null);

    setLoading(false);
  }

  if( loading ){
    return<div className='App'></div>;
  }

  return (
    <div className="App">
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path='/' element={<Home />} />
        {/* Dashboard: nested routes */}
        <Route path='/dashboard' element={<Dashboard user={user}/>}>
          <Route index element={<Navigate to="/dashboard/assets" />} />
          <Route path='/dashboard/login' element={<Login user={user} onLogin={()=>{onLogin()}}/>} />
          <Route path='/dashboard/logout' element={<Logout user={user} onLogout={()=>{onLogin()}}/>} />
          <Route path='/dashboard/assets' element={<Assets user={user}/>} />
          <Route path='/dashboard/assets/:assetId' element={<Assets user={user}/>} />
          <Route path='/dashboard/settings' element={<Settings user={user} />}/>
          <Route path='/dashboard/*' element={<NotFound />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
