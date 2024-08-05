import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppointmentContext } from '../Context/AppointmentContextProvider';
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setuser } = useAppointmentContext();
    const navigate = useNavigate();
    const { role, setrole } = useAppointmentContext();
    useEffect(() => {
        let tkn = Cookies.get('token');
        if (tkn) {
            navigate('/');
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:8080/api/auth/login", {
                method: "POST",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();
            if (res.status === 200 && data.token) {
                // Cookies.set('token', data.token);
                // setrole(data?.role);
                console.log("data", data);
                localStorage.setItem('name', JSON.stringify(data?.name));
                // setuser(data);
                setTimeout(() => {
                    navigate('/');
                }, 2000);
                toast.success('Login successful!');

            } else {
                toast.error(data.error || 'Error logging in');
            }
        } catch (error) {
            toast.error('Error logging in');
        }
    };

    return (
        <div
            style={{
                backgroundImage: "url('https://png.pngtree.com/thumb_back/fh260/background/20201101/pngtree-scene-with-geometrical-forms-the-poster-model-minimal-background-render-image_452981.jpg')",
                backgroundSize: "cover"
            }}


            className="bg-gray-100 flex items-center justify-center h-screen">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <p>Don't have account <span className='cursor-pointer mb-4 text-blue-500 underline' onClick={() => navigate('/register')}>sign up here</span></p>
                    <div className="flex items-center justify-between mt-2">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Login
                        </button>

                    </div>
                </form>
                <ToastContainer />
            </div>
        </div>
    );
};

export default Login;
