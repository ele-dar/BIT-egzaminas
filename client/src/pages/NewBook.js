import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import MainContext from '../context/MainContext';

const NewBook = () => {
    const [form, setForm] = useState({});
    const { setAlert, userInfo } = useContext(MainContext);

    const navigate = useNavigate();

    const handleForm = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/books/new', form)
            .then(resp => {
                setAlert({ message: resp.data, status: 'success' });
                navigate('/admin');
            })
            .catch(e => {
                console.log(e);
                setAlert({
                    message: e.response.data,
                    status: 'danger'
                });
            });
    };

    return (
        <>
            <div className="mx-auto border rounded p-5" style={{ maxWidth: '576px' }}>
                <form onSubmit={handleSubmit}>
                    <h1 className='h3'>Pridėti naują knygą</h1>
                    <div className="mt-3">
                        <label className="form-label">Autorius:</label>
                        <input className="form-control" type="text" name="author" onChange={(e) => handleForm(e)} />
                    </div>
                    <div className="mt-3">
                        <label className="form-label" >Pavadinimas:</label>
                        <input className="form-control" type='text' name="title" onChange={(e) => handleForm(e)}></input>
                    </div>
                    <div className="mt-3">
                        <label className="form-label">Kategorija:</label>
                        <input className="form-control" type="text" name="category" onChange={(e) => handleForm(e)} />
                    </div>
                    <div className='mt-4 d-flex justify-content-between'>
                        <button className="btn btn-secondary">Išsaugoti</button>
                        <Link to='/admin' className="btn btn-outline-secondary">Atgal</Link>
                    </div>
                </form>
            </div>
        </>
    );
};

export default NewBook;
