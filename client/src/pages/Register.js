import axios from 'axios'
import { useContext, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import MainContext from '../context/MainContext'

const Register = () => {
    const [form, setForm] = useState({})
    const { setAlert } = useContext(MainContext)

    const navigate = useNavigate()

    const handleForm = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('/api/users/register', form)
            .then(resp => {
                setAlert({ message: resp.data, status: 'success' })
                navigate('/login')
            })
            .catch(e => {
                console.log(e)
                setAlert({
                    message: e.response.data,
                    status: 'danger'
                })
            })
    }

    return (
        <>
            <div className="mx-auto border rounded p-5" style={{ maxWidth: '576px' }}>
                <form onSubmit={handleSubmit}>
                    <h1 className='h3'>Naujas vartotojas</h1>
                    <div className="mt-3">
                        <label className="form-label">Vardas:</label>
                        <input className="form-control" type="text" name="first_name" onChange={(e) => handleForm(e)} />
                    </div>
                    <div className="mt-3">
                        <label className="form-label" >Pavardė:</label>
                        <input className="form-control" type='text' name="last_name" onChange={(e) => handleForm(e)}></input>
                    </div>
                    <div className="mt-3">
                        <label className="form-label">El.paštas:</label>
                        <input className="form-control" type="email" name="email" onChange={(e) => handleForm(e)} />
                    </div>
                    <div className="mt-3">
                        <label className="form-label">Slaptažodis:</label>
                        <input className="form-control" type="password" name="password" onChange={(e) => handleForm(e)} />
                    </div>
                    <div className='mt-4 d-flex justify-content-between'>
                        <button className="btn btn-secondary">Registruotis</button>
                        <Link to='/' className="btn btn-outline-secondary">Atgal</Link>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Register