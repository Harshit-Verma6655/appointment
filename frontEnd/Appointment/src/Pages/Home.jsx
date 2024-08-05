import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import BookAppointment from './BookAppointment';
import AppointmentsPage from './AppointmentsPage';
import { useAppointmentContext } from '../Context/AppointmentContextProvider';
function Home() {
    const { role, setrole } = useAppointmentContext();
    console.log("rol", role);
    const navigate = useNavigate();

    // console.log("roleee", rol);
    useEffect(() => {

        const token = Cookies.get('token');

        if (!token) {
            navigate('/login');
        } else {
            let rol = Cookies.get('role');
            setrole(rol);
            // setrole(roleFromCookie);
            // setLoading(false);
        }



    }, [navigate, setrole])
    if (role === null) {
        return (<><div>Loading...</div></>)
    }
    let tkn = Cookies.get('token');
    if (!tkn) {
        navigate('/login');
    }
    return (<>

        {role == "Teacher" ? <AppointmentsPage /> : <BookAppointment />}
        {/* <BookAppointment /> */}
        {/* <AppointmentsPage /> */}
    </>

    )
}

export default Home