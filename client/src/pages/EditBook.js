import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import MainContext from '../context/MainContext';

const EditBook = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { setAlert, userInfo } = useContext(MainContext);
    const [form, setForm] = useState({
        author: '',
        title: '',
        category: '',
    });

    const handleForm = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        axios.get('/api/books/single/' + id)
            .then(resp => { setForm(resp.data); })
            .catch(e => {
                console.log(e);
                setAlert({ status: 'danger', message: e.response.data });
            });
    }, [id, setAlert]);


    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put('/api/books/edit/' + id, form)
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
                    <h1 className='h3'>Keisti knygos duomenis</h1>
                    <div className="mt-3">
                        <label className="form-label">Autorius:</label>
                        <input className="form-control" type="text" name="author" onChange={(e) => handleForm(e)} value={form.author} />
                    </div>
                    <div className="mt-3">
                        <label className="form-label" >Pavadinimas:</label>
                        <input className="form-control" type='text' name="title" onChange={(e) => handleForm(e)} value={form.title} />
                    </div>
                    <div className="mt-3">
                        <label className="form-label">Kategorija:</label>
                        <input className="form-control" type="text" name="category" onChange={(e) => handleForm(e)} value={form.category} />
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

export default EditBook;
