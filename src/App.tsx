import { BrowserRouter, Route, Routes } from 'react-router-dom';
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

  useEffect(()=>{
    onLogin();
  },[])

  // on a successful login event
  async function onLogin(){
    // fetch the logged in user
    //window.alert('Hoeray! logged-in!');
    const result = await api_user_getAuthenticatedUser();
    if( !result.message){
      setUser(result);
    }
  }

  return (
    <div className="App">
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      {/*<NavigationBar />
      <br/>*/}
      <Routes>
        <Route path='/' element={<Home />} />

        {/* Dashboard: nested routes */}
        <Route path='/dashboard' element={<Dashboard user={user}/>}>
          <Route path='/dashboard/login' element={<Login user={user} onLogin={()=>{onLogin()}}/>} />
          <Route path='/dashboard/logout' element={<Logout user={user} onLogout={()=>{onLogin()}}/>} />
          <Route path='/dashboard/assets' element={<Assets />} />
          <Route path='/dashboard/assets/:assetId' element={<Assets />} />
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
