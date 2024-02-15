import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signupSchema } from './signup.validation.jsx';
import axios from 'axios';
import { useFormik } from 'formik';
import { failToaster, successToaster } from '../../../services/toster.jsx';
const Signup = () => {


    const navigate = useNavigate();
    const handleRegister = async (values) => {
        const { year, month, day, ...rest } = values;
        const DateOB = `${year}-${month}-${day}`;
        const updatedValues = { ...rest, DateOB };
        try {
            const result = await axios.post("http://localhost:10000/api/v1/user/signup", updatedValues)
            if (result) {
                const message = result.data.message;
                successToaster(message)
                navigate("/login")
            }
        } catch (error) {
            const message = error.response.data.message;
            failToaster(message)
        }
    }

    let formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            password: "",
            year: "2010",
            month: "01",
            day: "01",
            role: "USER"
        },
        validationSchema: signupSchema,
        onSubmit: handleRegister
    });




    useEffect(() => {
    }, [])



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
                                <label for="firstName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your first name</label>
                                <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" value={formik.values.firstName} name="firstName" id="firstName" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="youssif" required="" />
                                {formik.errors?.firstName && formik.touched.firstName ? (<span className="text-blue-500">{formik.errors.firstName}</span>) : null}

                            </div>
                            <div>
                                <label for="lastName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your last name</label>

                                <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" value={formik.values.lastName} name="lastName" id="lastName" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="salama" required="" />
                                {formik.errors?.lastName && formik.touched.lastName ? <span className="text-blue-500">{formik.errors.lastName}</span> : null}

                            </div>
                            <div>
                                <label for="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your phone</label>

                                <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="tel" value={formik.values.phone} name="phone" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="+201556543218" required="" />
                                {formik.errors?.phone && formik.touched.phone ? <span className="text-blue-500">{formik.errors.phone}</span> : null}

                            </div>
                            <div>
                                <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="email" value={formik.values.email} name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                                {formik.errors?.email && formik.touched.email ? <span className="text-blue-500">{formik.errors.email}</span> : null}
                            </div>
                            <div>
                                <label for="DateOB" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Date Of Birth</label>
                                <div className="DateOB text-slate-200" id="DateOB">
                                    <select onBlur={formik.handleBlur} onChange={formik.handleChange} name="year" id="year" className='bg-inherit' value={formik.values.year}>
                                        <option className="bg-blue-500" value="2010">2010</option>
                                        <option className="bg-blue-500" value="2009">2009</option>
                                        <option className="bg-blue-500" value="2008">2008</option>
                                        <option className="bg-blue-500" value="2007">2007</option>
                                        <option className="bg-blue-500" value="2006">2006</option>
                                        <option className="bg-blue-500" value="2005">2005</option>
                                        <option className="bg-blue-500" value="2004">2004</option>
                                        <option className="bg-blue-500" value="2003">2003</option>
                                        <option className="bg-blue-500" value="2002">2002</option>
                                        <option className="bg-blue-500" value="2001">2001</option>
                                        <option className="bg-blue-500" value="2000">2000</option>
                                        <option className="bg-blue-500" value="1999">1999</option>
                                        <option className="bg-blue-500" value="1998">1998</option>
                                        <option className="bg-blue-500" value="1997">1997</option>
                                        <option className="bg-blue-500" value="1996">1996</option>
                                        <option className="bg-blue-500" value="1995">1995</option>
                                        <option className="bg-blue-500" value="1994">1994</option>
                                        <option className="bg-blue-500" value="1993">1993</option>
                                        <option className="bg-blue-500" value="1992">1992</option>
                                        <option className="bg-blue-500" value="1991">1991</option>
                                        <option className="bg-blue-500" value="1990">1990</option>

                                    </select>
                                    <select onBlur={formik.handleBlur} onChange={formik.handleChange} name="month" id="month" className='bg-inherit' value={formik.values.month}>
                                        <option className="bg-blue-500" value="01">January</option>
                                        <option className="bg-blue-500" value="02">February</option>
                                        <option className="bg-blue-500" value="03">March</option>
                                        <option className="bg-blue-500" value="04">April</option>
                                        <option className="bg-blue-500" value="05">May</option>
                                        <option className="bg-blue-500" value="06">June</option>
                                        <option className="bg-blue-500" value="07">July</option>
                                        <option className="bg-blue-500" value="08">August</option>
                                        <option className="bg-blue-500" value="09">September</option>
                                        <option className="bg-blue-500" value="10">October</option>
                                        <option className="bg-blue-500" value="11">November</option>
                                        <option className="bg-blue-500" value="12">December</option>
                                    </select>
                                    <select onBlur={formik.handleBlur} onChange={formik.handleChange} name="day" id="day" className='bg-inherit' value={formik.values.day}>
                                        <option className="bg-blue-500" value="01">1</option>
                                        <option className="bg-blue-500" value="02">2</option>
                                        <option className="bg-blue-500" value="03">3</option>
                                        <option className="bg-blue-500" value="04">4</option>
                                        <option className="bg-blue-500" value="05">5</option>
                                        <option className="bg-blue-500" value="06">6</option>
                                        <option className="bg-blue-500" value="07">7</option>
                                        <option className="bg-blue-500" value="08">8</option>
                                        <option className="bg-blue-500" value="09">9</option>
                                        <option className="bg-blue-500" value="10">10</option>
                                        <option className="bg-blue-500" value="11">11</option>
                                        <option className="bg-blue-500" value="12">12</option>
                                        <option className="bg-blue-500" value="13">13</option>
                                        <option className="bg-blue-500" value="14">14</option>
                                        <option className="bg-blue-500" value="15">15</option>
                                        <option className="bg-blue-500" value="16">16</option>
                                        <option className="bg-blue-500" value="17">17</option>
                                        <option className="bg-blue-500" value="18">18</option>
                                        <option className="bg-blue-500" value="19">19</option>
                                        <option className="bg-blue-500" value="20">20</option>
                                        <option className="bg-blue-500" value="21">21</option>
                                        <option className="bg-blue-500" value="22">22</option>
                                        <option className="bg-blue-500" value="23">23</option>
                                        <option className="bg-blue-500" value="24">24</option>
                                        <option className="bg-blue-500" value="25">25</option>
                                        <option className="bg-blue-500" value="26">26</option>
                                        <option className="bg-blue-500" value="27">27</option>
                                        <option className="bg-blue-500" value="28">28</option>
                                        <option className="bg-blue-500" value="29">29</option>
                                        <option className="bg-blue-500" value="30">30</option>
                                        <option className="bg-blue-500" value="31">31</option>

                                    </select>
                                </div>
                            </div>
                            <div>
                                <label for="role" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Role</label>
                                <select onBlur={formik.handleBlur} name="role" id="role" className='text-slate-200 bg-inherit' value={formik.values.role} onChange={formik.handleChange}>
                                    <option className="bg-blue-500" value="USER">user</option>
                                    <option className="bg-blue-500" value="COMPANY_HR">company hr</option>
                                </select>
                            </div>
                            <div>
                                <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                {formik.errors?.password && formik.touched.password ? <span className="text-blue-500">{formik.errors.password}</span> : null}

                            </div>


                            <button type="submit" className="w-full m-1 py-2 px-4 bg-slate-200 text-blue-500 font-semibold rounded-lg shadow-md hover:bg-blue-500 hover:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">Create an account</button>

                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Already have an account? <Link to={"/login"} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    );
}
export default Signup;
