import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import MainContext from '../context/MainContext';
import logo from '../images/logo.png';

const Header = () => {
    const { setAlert, userInfo, setUserInfo } = useContext(MainContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        axios.get('/api/users/logout')
            .then(resp => {
                setUserInfo({});
                setAlert({ message: resp.data, status: 'success' });
                navigate('/');
            })
            .catch(e => {
                setAlert({ message: e.response.data, status: 'danger' });
            });
    };

    return (
        <header className="p-3 px-5  border-bottom bg-light">
            <div className='container d-flex align-items-center '>
                <Link to="/">
                    <img className='' src={logo} alt="Main logo" style={{ maxHeight: '5rem' }} />
                </Link>
                <nav className="nav ms-3 me-auto h5">
                    {userInfo.role === '0' && <Link to='/user/books' className="nav-link text-black px-2">Mano knygos</Link>}
                    {userInfo.role === '1' && (
                        <>
                            <Link to='/admin' className="nav-link text-black px-2">Valdyti knygas</Link>
                            <Link to='/admin/users' className="nav-link text-black px-2">Vartotojai</Link>
                        </>
                    )}
                </nav>
                {userInfo.id ?
                    <>
                        <div className='me-3'>Sveiki, {userInfo.first_name}</div>
                        <button className="btn btn-secondary" onClick={handleLogout}>Atsijungti</button>
                    </>
                    : (
                        <>
                            <Link to='/login' type="button" className="btn btn-outline-secondary me-2">Prisijungti</Link>
                            <Link to='/register' type="button" className="btn btn-secondary">Registruotis</Link>
                        </>
                    )
                }
            </div>
        </header>
    );
};

export default Header;
