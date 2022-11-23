import axios from 'axios';
import { useContext, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import MainContext from '../context/MainContext';
import { BOOK_CATEGORIES } from '../data/categories';

const UserPage = () => {
    const { setAlert, userInfo } = useContext(MainContext);
    const [books, setBooks] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [filterInput, setFilterInput] = useState('');
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
        setFilterInput('');
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

    const handleFilter = (value) => {
        setFilterInput(value);
        setSearchInput('');
        if (value) {
            axios.get('/api/books/filter/' + value)
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
            </form>
            <select className="form-select mb-3" onChange={(e) => handleFilter(e.target.value)} value={filterInput}>
                <option value='' defaultValue className='text-secondary'>Filtruoti pagal kategoriją</option>
                {BOOK_CATEGORIES.map((category, index) =>
                    <option value={category} key={index}>{category}</option>
                )}
            </select>
            {books.length > 0 ?
                <>
                    <div className="row">
                        {books.map(book =>
                            <div className="col col-12 col-sm-6 col-md-4 col-lg-3 mb-3" key={book.id}>
                                <div className="card h-100">
                                    <div className="card-body d-flex flex-column">
                                        <h5 className="card-title">{book.title}</h5>
                                        <p className="card-text">{book.author}</p>
                                        <p className="card-text mt-auto"><small className="text-muted">{book.category}</small></p>
                                        <button className='btn btn-outline-danger' onClick={() => handleReservation(book.id)} disabled={book.isReserved}>Rezervuoti</button>
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>
                </>
                :
                <div className="mx-auto border rounded p-2">
                    Knygų nerasta
                </div>}
        </>
    );
};

export default UserPage;
