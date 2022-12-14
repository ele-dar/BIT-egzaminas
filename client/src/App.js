import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import MainContext from './context/MainContext';
import Alert from './components/Alert';
import Header from './components/Header';

import Login from './pages/Login';
import Register from './pages/Register';
import NewBook from './pages/NewBook';
import EditBook from './pages/EditBook';
import Admin from './pages/Admin';
import AllBooks from './pages/AllBooks';
import UserPage from './pages/UserPage';
import UserBooks from './pages/UserBooks';
import AllUsers from './pages/AllUsers';

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
            {/* User routes */}
            {userInfo.role === '0' &&
              <>
                <Route path='/' element={<UserPage />} />
                <Route path='/user/home' element={<UserPage />} />
                <Route path='/user/books' element={<UserBooks />} />
              </>
            }

            {/* Admin routes */}
            {userInfo.role === '1' &&
              <>
                <Route path='/books/new' element={<NewBook />} />
                <Route path='/admin/' element={<Admin />} />
                <Route path='/admin/edit/:id' element={<EditBook />} />
                <Route path='/admin/users' element={<AllUsers />} />
              </>
            }

            <Route path='/' element={<AllBooks />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />

            {/* <Route path='/home' element={<AllBooks />} /> */}
            <Route path='/*' element={<Login />} />
          </Routes>
        </main>
      </MainContext.Provider>
    </BrowserRouter>
  );
}

export default App;
