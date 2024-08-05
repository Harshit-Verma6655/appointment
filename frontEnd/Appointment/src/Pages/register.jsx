


import React, { useEffect, useState } from 'react';
import register from '../APIs/register';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from 'react-router-dom';
import { useAppointmentContext } from '../Context/AppointmentContextProvider';
import Cookies from 'js-cookie';
const Register = () => {
    const navigate = useNavigate();
    const { role, setrole } = useAppointmentContext();
    const [formData, setFormData] = useState({
        Name: '',
        email: '',
        phone: '',
        role: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            navigate("/");
        }

    }, [])
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle htmlForm submission logic here
        console.log('htmlForm data:', formData);

        register(formData).then((data) => {
            console.log("dataReturned", data);
            // setrole(data?.role);
            if (data.status === 201) {

                toast.success('Registration successful!', {
                    position: "top-right"
                });
                setTimeout(() => {
                    navigate("/");
                }, 2000)
            }
            else {
                toast.error('Error registering user', {
                    position: "top-right"
                });
            }
        });
    };

    return (<>
        <section style={{
            backgroundImage: "url('https://png.pngtree.com/thumb_back/fh260/background/20201101/pngtree-scene-with-geometrical-forms-the-poster-model-minimal-background-render-image_452981.jpg')",
            backgroundSize: "cover"
        }} className="bg-blue-100 dark:bg-gray-900">
            <ToastContainer />

            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">


                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-lg mb-2 font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Register
                        </h1>
                        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6" action="#">

                            <div className="mb-4 flex justify-center items-center gap-5">
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                <input type="text" name="Name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="your name" required=""
                                    onChange={handleChange}

                                />
                            </div>

                            <div className="mb-4 flex justify-center items-center gap-5">
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""
                                    onChange={handleChange}

                                />
                            </div>
                            <div className="mb-4 flex justify-center items-center gap-5">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="phone">
                                    Phone
                                </label>
                                <input
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    placeholder="Enter your phone number"

                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-4 flex justify-center items-center gap-5">
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-4 flex justify-center items-center gap-5">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="role">
                                    Role
                                </label>
                                <select
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    name="role"

                                    onChange={handleChange}
                                >
                                    <option value="Student">--select--</option>
                                    <option value="Teacher">Teacher</option>
                                    <option value="Student">Student</option>
                                    <option value="Institute">Institute</option>
                                </select>
                            </div>



                            <button type="submit" className="w-full hover:bg-blue-200 bg-blue-100 text-black bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Already have an account? <Link to="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>

        </section>
    </>);
}


export default Register;


