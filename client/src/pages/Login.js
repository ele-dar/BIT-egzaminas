import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import MainContext from '../context/MainContext';
import axios from 'axios';

const Login = () => {
    const { setAlert, setUserInfo } = useContext(MainContext);
    const [form, setForm] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();

    const handleForm = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('/api/users/login', form)
            .then(resp => {
                setUserInfo(resp.data.user);
                setAlert({ message: resp.data.message, status: 'success' });
                if (resp.data.user.role == 1)
                    return navigate('/');
                navigate('/');
            })
            .catch(e => {
                console.log(e);
                setAlert({ message: e.response.data, status: 'danger' });
            });

    };

    return (
        <>
            <div className="mx-auto border rounded p-5" style={{ maxWidth: '576px' }}>
                <form onSubmit={handleSubmit}>
                    <h1 className='h3'>Prisijungti</h1>
                    <div className="mt-3">
                        <label className="form-label">El. paštas:</label>
                        <input className="form-control" type="email" name="email" onChange={(e) => handleForm(e)} />
                    </div>
                    <div className="mt-3">
                        <label className="form-label">Slaptažodis:</label>
                        <input className="form-control" type="password" name="password" onChange={(e) => handleForm(e)} />
                    </div>
                    <div className='mt-4 d-flex justify-content-between'>
                        <button className="btn btn-secondary">Tęsti</button>
                        <Link to='/' className='btn btn-outline-secondary'>Atgal</Link>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Login;
