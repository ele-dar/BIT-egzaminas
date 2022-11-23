import axios from 'axios';
import { useContext, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import MainContext from '../context/MainContext';

const AllBooks = () => {
    const { setAlert } = useContext(MainContext);
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

    return (
        <>
            <div className='d-flex justify-content-between mb-3'>
                <h1 className='h3'>Bibliotekos knygos</h1>
            </div>
            <form onSubmit={handleSearch} className="form-inline mb-3">
                <input className="form-control" type="text" name="search" placeholder='Ieškoti knygos' onChange={e => setSearchInput(e.target.value)} value={searchInput} />
            </form>
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
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>
                </>
                :
                <div className="mx-auto border rounded p-5">
                    Knygų nerasta
                </div>}
        </>
    );
};

export default AllBooks;
