import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import MainContext from './context/MainContext';
import Alert from './components/Alert';
import Header from './components/Header';

import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  const [alert, setAlert] = useState({ message: '', status: '' });
  const [userInfo, setUserInfo] = useState({});
  const contextValues = { alert, setAlert, userInfo, setUserInfo };

  useEffect(() => {
    axios.get('/api/users/check-auth')
      .then(resp => {
        setUserInfo(resp.data);
      });
  }, []);

  return (
    <BrowserRouter>
      <MainContext.Provider value={contextValues}>
        <Header />
        <Alert />
        <main className='container my-5 p-4' >
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />

            {/* Admin routes */}
            {/* {userInfo.role === '1' &&
            <Route path='/admin/' element={<Admin />} /> }*/}
            {/* User routes */}
            {/* {userInfo.role === '0' &&
            <Route path='/user/' element={<User />} />} */}
            <Route path='/*' element={<Login />} />
          </Routes>
        </main>
      </MainContext.Provider>
    </BrowserRouter>
  );
}

export default App;
