// src/pages/AppointmentsPage.js
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// import axios from 'axios';
import { toast } from 'react-toastify';
import { FcApprove } from "react-icons/fc";
import { FcDisapprove } from "react-icons/fc";
import { useAppointmentContext } from '../Context/AppointmentContextProvider';

const AppointmentsPage = () => {
    const { teacherId } = useParams();
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState("pending");
    const navigate = useNavigate();
    // const { user } = useAppointmentContext();
    const [user, setUser] = useState();
    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/appointment/getAppointments`,
                    {
                        method: 'GET',
                        credentials: 'include'  // Ensure cookies are sent with the request
                    }
                );
                let data = await response.json();
                console.log(data.allAppointments);
                setAppointments(data.allAppointments);
            } catch (error) {
                toast.error('Error fetching appointments');
            } finally {
                setLoading(false);
            }
        };

        fetchAppointments();
        setUser(JSON.parse(localStorage.getItem('name')));
    }, [teacherId]);
    const handleApprove = async (id) => {
        const response = await fetch(`http://localhost:8080/api/appointment/confirmAppointment/${id}`,
            {
                method: 'GET',
                credentials: 'include'  // Ensure cookies are sent with the request
            }
        );
        const data = await response.json();
        setStatus("confirmed");
        window.location.reload();
        console.log(data);
    }

    const handleDisApprove = async (id) => {
        const response = await fetch(`http://localhost:8080/api/appointment/disapprove/${id}`,
            {
                method: 'GET',
                credentials: 'include'  // Ensure cookies are sent with the request
            }
        );
        const data = await response.json();
        setStatus("pending");
        window.location.reload();
        console.log(data);
    }


    const handleLogout = async () => {
        const res = await fetch("http://localhost:8080/api/auth/logout", {
            method: "GET",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            }

        });
        const data = await res.json();
        console.log(data);
        navigate("/");

    }


    if (loading) return <div>Loading...</div>;

    return (<>

        <div className='text-right font-bold bg-black text-white p-2 fixed flex gap-3 flex-row-reverse top-0 w-full'><span className='hover:cursor-pointer'
            onClick={handleLogout}
        >Log Out</span>
            <span>{user?.toUpperCase()}</span>

        </div>

        <div className="container mx-auto p-20">
            <h1 className="text-2xl font-bold mb-4">Appointments for Teacher </h1>
            {appointments.length === 0 ? (
                <p>No appointments found.</p>
            ) : (
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr className="border-b bg-blue-400">
                            <th className="px-4 py-2 text-left">Date</th>
                            <th className="px-4 py-2 text-left">Time</th>
                            <th className="px-4 py-2 text-left">Student Name</th>
                            <th className="px-4 py-2 text-left">Status</th>
                            <th className="px-4 py-2 text-left">Approve</th>
                            <th className="px-4 py-2 text-left">Disapprove</th>
                        </tr>
                    </thead>
                    <tbody className='bg-blue-50'>
                        {appointments.map((appointment) => (
                            <tr key={appointment._id} className="border-b">
                                <td className="px-4 py-2">{new Date(appointment.appointmentDate
                                ).toLocaleDateString()}</td>
                                <td className="px-4 py-2">{appointment.appointmentTime}</td>
                                <td className="px-4 py-2">{appointment.studentId.Name}</td>
                                <td className="px-4 py-2">{appointment.status}</td>
                                <td onClick={() => handleApprove(appointment._id)} className="px-4 py-2 cursor-pointer"><FcApprove /></td>
                                <td onClick={() => handleDisApprove(appointment._id)} className="px-4 py-2 cursor-pointer"><FcDisapprove /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    </>
    );
};

export default AppointmentsPage;
