import { useContext, useEffect } from "react"
import MainContext from "../context/MainContext"

const Alert = () => {
    const { alert, setAlert } = useContext(MainContext)

    useEffect(() => {
        if (alert.message === '') return
        window.scroll(0, 0)
        setTimeout(() => {
            setAlert({
                message: ''
            })
        }, 2000)
    }, [alert])

    return alert.message && <div className={'container p-2 mt-2 alert fw-bold text-' + alert.status + ' border-' + alert.status}>{alert.message}</div>
}

export default Alert