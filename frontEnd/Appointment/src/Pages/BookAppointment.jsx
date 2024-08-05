import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'tailwindcss/tailwind.css';
import { useAppointmentContext } from '../Context/AppointmentContextProvider';

const BookAppointment = () => {
    const [teachers, setTeachers] = useState([]);
    const [selectedTeacher, setSelectedTeacher] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [student, setStudent] = useState('');
    const navigate = useNavigate();
    // const { user } = useAppointmentContext();
    const [user, setUser] = useState();
    useEffect(() => {
        // Fetch the list of teachers from the API
        async function fetchTeachers() {
            try {
                const response = await fetch('http://localhost:8080/api/auth/allteachers', {
                    method: 'GET',
                    credentials: 'include'  // Ensure cookies are sent with the request
                });
                const data = await response.json();
                console.log("teacherData", data);
                setTeachers(data?.allTeachers);
                setStudent(data?.id);
            } catch (error) {
                toast.error('Error fetching teachers');
            }
        }
        fetchTeachers();
        setUser(JSON.parse(localStorage.getItem('name')));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8080/api/appointment/${student}/${selectedTeacher}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    teacher: selectedTeacher,
                    appointmentDate: selectedDate,
                    appointmentTime: selectedTime,
                }),
            });
            const data = await response.json();
            if (response.ok) {
                toast.success('Appointment request sent!');
                setTimeout(() => {
                    window.location.reload();
                }, 3000)

            } else {
                toast.error(data.error || 'Failed to book appointment');
            }
        } catch (error) {
            toast.error('Error booking appointment');
        }
    };
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

    return (<>
        <div className='h-screen'>
            <div className='text-right font-bold bg-black text-white p-2 fixed flex flex-row-reverse gap-4 top-0 w-full'><span className='hover:cursor-pointer'
                onClick={handleLogout}
            >Log Out</span>
                <span>{user?.toUpperCase()}</span>
            </div>
            <div className="bg-gray-100 flex items-center justify-center h-full">

                <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Book an Appointment</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="teacher">
                                Select Teacher
                            </label>
                            <select
                                id="teacher"
                                value={selectedTeacher}
                                onChange={(e) => setSelectedTeacher(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            >
                                <option value="">Select a teacher</option>
                                {teachers.map((teacher) => (
                                    <option key={teacher._id} value={teacher._id}>
                                        {teacher.Name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
                                Date
                            </label>
                            <input
                                type="date"
                                id="date"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="time">
                                Time
                            </label>
                            <input
                                type="time"
                                id="time"
                                value={selectedTime}
                                onChange={(e) => setSelectedTime(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Book Appointment
                            </button>
                        </div>
                    </form>
                    <ToastContainer />
                </div>
            </div>
        </div>
    </>
    );
};

export default BookAppointment;
