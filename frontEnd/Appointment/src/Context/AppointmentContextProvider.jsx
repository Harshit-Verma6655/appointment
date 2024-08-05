import React, { useState } from 'react'
import { createContext, useContext } from 'react'
import Cookies from 'js-cookie';
const appointmentContext = createContext();

export const useAppointmentContext = () => {
    return useContext(appointmentContext);
}

export function AppointmentContextProvider({ children }) {
    const [role, setRole] = useState(null);
    // const [cookie, setCookie]=useState(null);
    const [user, setUser] = useState(null);
    const setrole = () => {
        let rol = Cookies.get('role');
        setRole(rol);
        console.log('rollll', rol);
    }
    const setuser = () => {
        const name = JSON.parse(localStorage.getItem('name'));
        setUser({ name });
    }



    return (
        <appointmentContext.Provider value={{ role, setrole, setuser, user }}>
            {children}
        </appointmentContext.Provider>
    )
}
// export default AppointmentContextProvider;


