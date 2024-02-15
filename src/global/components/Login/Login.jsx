import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginSchema } from './login.validation.jsx';
import { useFormik } from 'formik';
import axios from 'axios';

import { failToaster, successToaster } from '../../../services/toster.jsx';
import { jwtDecode } from 'jwt-decode';
const Login = () => {
    const navigate = useNavigate();
    const handleSubmit = async (values) => {
        try {
            const result = await axios.post("http://localhost:10000/api/v1/user/login", values)
            if (result) {
                const message = result.data.message;
                successToaster(message)
                localStorage.setItem("userToken", result.data.token)
                const userToken = localStorage.getItem("userToken")
                const userDataToken = jwtDecode(userToken)
                if (userDataToken?.role) { navigate("/profile"); window.location.reload(); }
            }
        } catch (error) {
            const message = error.response.data.message;
            failToaster(message)
        }
    }
    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: loginSchema,
        onSubmit: handleSubmit
    })


    return (
        <div className='signup mt-28 p-4 mb-2'>

            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-5xl text-center"><Link to={"/"} className='text-blue-500'>JURO</Link></h1>

                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Create an account
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={formik.handleSubmit}>

                            <div>
                                <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.email}
                                />
                                {formik.errors?.email && formik.touched.email ? <span className="text-blue-500">{formik.errors.email}</span> : null}

                            </div>

                            <div>
                                <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.password}
                                />
                            </div>


                            <button type="submit" className="w-full m-1 py-2 px-4 bg-slate-200 text-blue-500 font-semibold rounded-lg shadow-md hover:bg-blue-500 hover:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">Login</button>

                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don't have an account? <Link to={"/signup"} className="font-medium text-primary-600 hover:underline dark:text-primary-500">signup here</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Login;
