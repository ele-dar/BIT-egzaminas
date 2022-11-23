import axios from 'axios';
import { useContext, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import MainContext from '../context/MainContext';

const Admin = () => {
    const { setAlert } = useContext(MainContext);
    const [books, setBooks] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('/api/books/')
            .then(resp => {
                setBooks(resp.data);
            })
            .catch(e => {
                console.log(e);
                setAlert({
                    message: e.response.data,
                    status: 'danger'
                });
            });
    }, [refresh]);

    const handleDelete = (id) => {
        axios.delete('/api/books/delete/' + id)
            .then(resp => {
                setAlert({ status: 'success', message: resp.data });
                window.scroll(0, 0);
                setRefresh(!refresh);
            })
            .catch(e => {
                setAlert({ status: 'danger', message: e.response.data });
                if (e.response.status === 401) {
                    setTimeout(() => { navigate('/login'); }, 1000);
                }
            });
    };

    return (
        books.length > 0 ?
            <>
                <div className='d-flex justify-content-between mb-3'>
                    <h1 className='h3'>Visi duomenys</h1>
                    <Link to='/books/new' className='btn btn-outline-secondary'>Pridėti naują knygą</Link>
                </div>
                <table className="table table-hover align-middle">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Autorius</th>
                            <th>Pavadinimas</th>
                            <th>Kategorija</th>
                            <th>Veiksmai</th>
                        </tr>
                    </thead>
                    <tbody >
                        {books.map(book =>
                            <tr key={book.id}>
                                <td >{book.id}</td>
                                <td >{book.author}</td>
                                <td >{book.title}</td>
                                <td >{book.category}</td>
                                <td className='fit'>
                                    <Link to={'/admin/edit/' + book.id} className='btn btn-outline-secondary me-3'>Redaguoti</Link>
                                    <button className='btn btn-outline-danger' onClick={() => handleDelete(book.id)}>Ištrinti</button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </>
            :
            <div className="mx-auto border rounded p-5">
                Duomenų bazėje knygų nėra
            </div>

    );
};

export default Admin;
