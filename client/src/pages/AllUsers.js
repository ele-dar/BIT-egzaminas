import axios from 'axios';
import { useContext, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import MainContext from '../context/MainContext';

const AllUsers = () => {
    const { setAlert } = useContext(MainContext);
    const [users, setUsers] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('/api/users/')
            .then(resp => {
                setUsers(resp.data);
            })
            .catch(e => {
                console.log(e);
                setAlert({
                    message: e.response.data,
                    status: 'danger'
                });
            });
    }, [refresh]);

    return (
        <>
            <div className='d-flex justify-content-between mb-3'>
                <h1 className='h3'>Vartotojai</h1>
            </div>
            {
                users.length > 0 ?
                    <table className="table table-hover align-middle table-responsive">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Vardas</th>
                                <th>Pavardė</th>
                                <th>El.paštas</th>
                                <th>Statusas</th>
                            </tr>
                        </thead>
                        <tbody >
                            {users.map(user =>
                                <tr key={user.id}>
                                    <td >{user.id}</td>
                                    <td >{user.first_name}</td>
                                    <td >{user.last_name}</td>
                                    <td >{user.email}</td>
                                    <td >{user.role == 1 ? "Administratorius" : "Vartotojas"}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    :
                    <div className="mx-auto border rounded p-5">
                        Vartotojų nerasta
                    </div>
            }
        </>
    );
};

export default AllUsers;
