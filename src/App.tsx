import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import NotFound from './Pages/404';

function App() {
  return (
    <div className="App">
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      {/*<NavigationBar />
      <br/>*/}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login user={null} onLogin={()=>{}}/>} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
