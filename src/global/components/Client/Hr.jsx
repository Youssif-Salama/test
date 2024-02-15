import React from 'react';
import User from './User.jsx';
import { useFormik } from 'formik';
import axios from 'axios';
import { failToaster, successToaster } from '../../../services/toster.jsx';
const Hr = () => {
    const actorAddedCompany = localStorage.getItem("actorAddedCompany")
    const getUserToken = localStorage.getItem("userToken");
    const headers = {
        headers: {
            userToken: getUserToken,
        },
    };
    async function handleAddCompany(values) {
        values = {
            ...values,
            numOfEmployees: {
                from: document.querySelector("form input.from").value,
                to: document.querySelector("form input.to").value
            }
        }
        values = {
            ...values,
            address: {
                country: document.querySelector("form input.country").value,
                governRate: document.querySelector("form input.governRate").value,
                postalCode: document.querySelector("form input.postalCode").value
            }
        }
        const result = await axios.post(`http://localhost:10000/api/v1/company`, values, headers)
        if (!result) failToaster("failed to add company");
        successToaster("success")
        document.querySelector(".company_hr .company").classList.add("hidden")
    }

    const formik = useFormik({
        initialValues: {
            companyName: "",
            description: "",
            industry: "",
            email: "",
        },
        onSubmit: handleAddCompany
    })
    return (
        <div className='company_hr overflow-hidden'>
            <User />
            <div className="mt-16 add_company_job p-4 md:flex md:items-start md:justify-around text-center">

                {!actorAddedCompany && <div className="company border md:w-1/3 sm:w-3/4 my-4 mx-auto">
                    <div className="title text-blue-500 mb-3 p-4">
                        <h2>COMPANY</h2>
                    </div>
                    <div className="alert bg-blue-200 text-blue-900"> All Fields Are Required</div>


                    <form onSubmit={formik.handleSubmit} className='company_form'>

                        <div className='flex items-center justify-between m-3'>
                            <label htmlFor="companyName" className='text-blue-700 m-2'>company name</label>
                            <input value={formik.values.companyName} onChange={formik.handleChange} onBlur={formik.handleBlur} required type="text" id='companyName' name='companyName' className='companyName border' />
                        </div>

                        <div className='flex items-center justify-between m-3'>
                            <label htmlFor="description" className='text-blue-700 m-2'>description</label>
                            <textarea
                                value={formik.values.description} onChange={formik.handleChange} onBlur={formik.handleBlur}
                                name="description" id="description" className='description border' cols="30" rows="10" placeholder=" max :500" maxlength="500"></textarea>
                        </div>

                        <div className='flex items-center justify-between m-3'>
                            <label htmlFor="industry" className='text-blue-700 m-2'>industry</label>
                            <input
                                value={formik.values.industry} onChange={formik.handleChange} onBlur={formik.handleBlur}
                                required type="text" id='industry' name='industry' className='industry border' />
                        </div>

                        <div className='flex items-center justify-between m-3'>
                            <label htmlFor="email" className='text-blue-700 m-2'>company email</label>
                            <input
                                value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}
                                required type="text" id='email' name='email' className='email border' />
                        </div>

                        <div className='flex items-center justify-between m-3'>
                            <label htmlFor="numOfEmployees" className='text-blue-700 m-2'>employees</label>
                            <div className="flex flex-row justify-around numOfEmployees" id="numOfEmployees">
                                <input
                                    required type="number" id='from' name='from' className='from border w-1/3' placeholder='from' />
                                <input
                                    required type="number" id='to' name='to' className='to border w-1/3' placeholder='to' />
                            </div>
                        </div>

                        <div className='flex items-center justify-between m-3'>
                            <label htmlFor="address" className='text-blue-700 m-2'>address</label>
                            <div className="flex items-center flex-col" id="address">
                                <input
                                    required type="text" id='country' name='country' className='country border' placeholder=' country' />
                                <input
                                    required type="text" id='governRate' name='governRate' className='governRate border' placeholder=' governrate' />
                                <input
                                    required type="text" id='postalCode' name='postalCode' className='postalCode border' placeholder=' postal code' />
                            </div>
                        </div>

                        <button type='submit' className="mb-4 w-1/2 add m-1 py-2 px-4 bg-slate-200 text-blue-500 font-semibold rounded-lg shadow-md hover:bg-blue-500 hover:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"> add</button>

                    </form>

                </div>}











                <div className="job md:w-1/2 sm:w-3/4 border my-4 mx-auto">
                    <div className="title text-indigo-500 mb-3 p-4">
                        <h2>JOB</h2>
                    </div>
                    <div className="alert bg-indigo-200 text-indigo-900"> All Fields Are Required</div>

                    <form className='job_form'>

                        <div className='flex items-center justify-between m-3'>
                            <label htmlFor="jobTitle" className='text-indigo-700 m-2'>job title</label>
                            <input required type="text" id='jobTitle' name='jobTitle' className='jobTitle border' />
                        </div>

                        <div className='flex items-center justify-between m-3'>
                            <label htmlFor="seniorityLevel" className='text-indigo-700 m-2'>seniority level</label>
                            <select name="seniorityLevel" id="seniorityLevel" className='text-indigo-700 border'>
                                {/*         enum: ['Junior', 'Mid-Level', 'Senior', 'Team-Lead', 'CTO'],
 */}
                                <option value="Junior">Junior</option>
                                <option value="Mid-Level">Mid Level</option>
                                <option value="Senior">Senior</option>
                                <option value="Team-Lead">Team Lead</option>
                                <option value="CTO">CTO</option>
                            </select>
                        </div>

                        <div className='flex items-center justify-between m-3'>
                            <label htmlFor="workingTime" className='text-indigo-700 m-2'>working time</label>
                            <select name="workingTime" id="workingTime" className='text-indigo-700 border'>
                                <option value="part-time">part time</option>
                                <option value="full-time">full time</option>
                            </select>
                        </div>

                        <div className='flex items-center justify-between m-3'>
                            <label htmlFor="jobLocation" className='text-indigo-700 m-2'>job location</label>
                            <select name="jobLocation" id="jobLocation" className='text-indigo-700 border'>
                                <option value="onsite">onsite</option>
                                <option value="remotely">remotely</option>
                                <option value="hybrid">hybrid</option>
                            </select>
                        </div>

                        <div className='flex items-center justify-between m-3'>
                            <label htmlFor="jobDescription" className='text-indigo-700 m-2'>job description</label>
                            <textarea name="jobDescription" id="jobDescription" className='jobDescription border' cols="30" rows="10" placeholder=" max :500" maxlength="500"></textarea>
                        </div>

                        <div className='flex items-center justify-between m-3'>
                            <label htmlFor="technicalSkills" className='text-indigo-700 m-2'>technical skills</label>
                            <input required type="text" id='technicalSkills' name='technicalSkills' className='technicalSkills border' placeholder=' Html, Css ....' />
                        </div>

                        <div className='flex items-center justify-between m-3'>
                            <label htmlFor="softSkills" className='text-indigo-700 m-2'>soft skills</label>
                            <input required type="text" id='softSkills' name='softSkills' className='softSkills border' placeholder=' problem solver, ....' />
                        </div>

                        <button type='button' className="mb-4 w-1/2 add m-1 py-2 px-4 bg-slate-200 text-indigo-500 font-semibold rounded-lg shadow-md hover:bg-indigo-500 hover:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75"> add</button>
                    </form>
                </div>




            </div>
        </div>
    );
}

export default Hr;
