import axios from 'axios';
import { useContext, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import MainContext from '../context/MainContext';

const UserPage = () => {
    const { setAlert, userInfo } = useContext(MainContext);
    const [books, setBooks] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [searchInput, setSearchInput] = useState('');
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

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchInput) {
            axios.get('/api/books/search/' + searchInput)
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
        } else {
            setRefresh(!refresh);
        }
    };

    const handleReservation = (id) => {
        const date = new Date();
        date.setMonth(date.getMonth() + 1);
        const options = {
            isReserved: 1,
            returnDate: date,
            userId: userInfo.id
        };
        axios.put('/api/books/reserve/' + id, options)
            .then(resp => {
                setAlert({ message: resp.data, status: 'success' });
                setRefresh(!refresh);
                // navigate('/user/home');
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
            <div className='d-flex justify-content-between mb-3'>
                <h1 className='h3'>Bibliotekos knygos</h1>
            </div>
            <form onSubmit={handleSearch} className="mb-3">
                <input className="form-control" type="text" name="search" placeholder='Ieškoti knygos' onChange={e => setSearchInput(e.target.value)} />
                {/* <button type="submit" className='btn btn-outline-secondary'>Ieškoti</button>
                <button type="button" className='btn btn-outline-secondary' onClick={() => { setSearchInput(''); setRefresh(!refresh); }}>Išvalyti</button> */}
            </form>
            {books.length > 0 ?
                <>
                    <table className="table table-hover align-middle">
                        <thead>
                            <tr>
                                <th>Autorius</th>
                                <th>Pavadinimas</th>
                                <th>Kategorija</th>
                                <th>Rezervuoti</th>
                            </tr>
                        </thead>
                        <tbody >
                            {books.map(book =>
                                <tr key={book.id}>
                                    <td >{book.author}</td>
                                    <td >{book.title}</td>
                                    <td >{book.category}</td>
                                    <td className='fit'>
                                        <button className='btn btn-outline-danger' onClick={() => handleReservation(book.id)} disabled={book.isReserved}>Rezervuoti</button>
                                    </td>

                                </tr>
                            )}
                        </tbody>
                    </table>
                </>
                :
                <div className="mx-auto border rounded p-2">
                    Duomenų bazėje knygų nėra
                </div>}
        </>
    );
};

export default UserPage;
