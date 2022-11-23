import axios from 'axios';
import { useContext, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import MainContext from '../context/MainContext';

const UserBooks = () => {
    const { setAlert, userInfo } = useContext(MainContext);
    const [books, setBooks] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('/api/books/user/' + userInfo.id)
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

    const handleReservation = (id, returnDate) => {
        const date = new Date(returnDate);
        date.setMonth(date.getMonth() + 1);
        const options = {
            returnDate: date,
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

    const handleReturn = (id) => {
        const options = {
            isReserved: 0,
            returnDate: null,
            userId: null
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
                <h1 className='h3'>Mano knygos</h1>
            </div>
            {books.length > 0 ?
                <>
                    <table className="table table-hover align-middle">
                        <thead>
                            <tr>
                                <th>Autorius</th>
                                <th>Pavadinimas</th>
                                <th>Kategorija</th>
                                <th>Rezervuota iki</th>
                                <th>Veiksmai</th>
                            </tr>
                        </thead>
                        <tbody >
                            {books.map(book =>
                                <tr key={book.id}>
                                    <td >{book.author}</td>
                                    <td >{book.title}</td>
                                    <td >{book.category}</td>
                                    <td >{book.returnDate}</td>
                                    <td className='fit'>
                                        <button className='btn btn-outline-success me-1' onClick={() => handleReservation(book.id, book.returnDate)}>Pratęsti rezervaciją</button>
                                        <button className='btn btn-outline-warning' onClick={() => handleReturn(book.id)}>Grąžinti knygą</button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </>
                :
                <div className="mx-auto border rounded p-5">
                    Knygų nerasta
                </div>}
        </>
    );
};

export default UserBooks;
