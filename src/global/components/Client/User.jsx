import axios from 'axios';
import React, { useEffect, useState } from 'react';
import logo from "../../../images/logo.png"
import { useNavigate } from 'react-router-dom';
import { actorUpdateValidation } from './actor.validation.jsx';
import { failToaster, successToaster } from '../../../services/toster.jsx';

const User = () => {
    const navigate = useNavigate();
    const getUserToken = localStorage.getItem("userToken");
    const headers = {
        headers: {
            userToken: getUserToken,
        },
    };
    const [userData, setUserData] = useState({});
    const getLoggedInUserData = async () => {

        const result = await axios.get(`http://localhost:10000/api/v1/user/`, headers)
        if (result?.data) {
            setUserData(result.data.result);
            localStorage.setItem("actorAddedCompany", result?.data?.result?.company)
        }
    }

    const onclickUpdate = () => {
        document.querySelector("form select").classList.remove("hidden")
        document.querySelectorAll("form span").forEach(sp => {
            sp.classList.add("hidden")
        })
        document.querySelectorAll("form input").forEach(ip => {
            ip.classList.remove("hidden")
        })
        document.querySelector("form button.close").classList.remove("hidden");
        document.querySelector("form button.save").classList.remove("hidden");
        document.querySelector("form button.update").classList.add("hidden");
        document.querySelector("form .first_las_name").classList.remove("hidden");
    }

    const onclickClose = () => {
        document.querySelector("form select").classList.add("hidden")
        document.querySelectorAll("form span").forEach(sp => {
            sp.classList.remove("hidden")
        })
        document.querySelectorAll("form input").forEach(ip => {
            ip.classList.add("hidden")
        })
        document.querySelector("form button.close").classList.add("hidden")
        document.querySelector("form button.save").classList.add("hidden")
        document.querySelector("form button.update").classList.remove("hidden")
        document.querySelector("form .first_las_name").classList.add("hidden");
    }

    const handleSubmit = async () => {
        const role = document.querySelector("form .role");
        // const inputNodes = document.querySelectorAll("form input")
        const inputNodesValues = {};
        // inputNodes.forEach(node => {
        //     const nodeId = node.getAttribute("id");
        //     inputNodesValues[nodeId] = node.value;
        // })

        const firstName = document.querySelector("form input.firstName");
        const lastName = document.querySelector("form input.lastName");
        const email = document.querySelector("form input.email");
        const address = document.querySelector("form input.address");
        const skills = document.querySelector("form input.skills");
        const DateOB = document.querySelector("form input.DateOB");
        const phone = document.querySelector("form input.phone");

        (role.value).length > 0 && (inputNodesValues.role = role.value);
        (firstName.value).length && (inputNodesValues.firstName = firstName.value);
        (lastName.value).length > 0 && (inputNodesValues.lastName = lastName.value);
        (email.value).length > 0 && (inputNodesValues.email = email.value);
        (address.value).length > 0 && (inputNodesValues.address = address.value);
        (skills.value).length > 0 && (inputNodesValues.skills = skills.value);
        (DateOB.value).length > 0 && (inputNodesValues.DateOB = DateOB.value);
        (phone.value).length > 0 && (inputNodesValues.phone = phone.value);
        try {
            const values = await actorUpdateValidation.validate(inputNodesValues);
            const result = await axios.put(`http://localhost:10000/api/v1/user/`, values, headers)
            if (result) {
                setUserData(result?.data.result); successToaster(result.data.message);
            }
            else failToaster("failed to update");
        } catch (error) {
            console.log(error)
        }

    }

    const deleteAccount = async () => {
        await axios.delete("http://localhost:10000/api/v1/user", headers)
        localStorage.clear();
        navigate("/");
    }
    useEffect(() => {
        getLoggedInUserData();
    }, [])
    return (
        <>
            {userData?.confirmed === false ?
                <div class="p-4 mt-32 m-4 mx-2  text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300" role="alert">
                    <span class="font-medium">Warning alert!</span> Your email not confirmed yet, please check your mail.
                </div>
                : null}
            <div className='user pb-8 pt-24 md:px-4 px-2 md:flex md:flex-row md:items-center md:justify-around sm:flex sm:items-center sm:mx-auto sm:flex-col'>
                <>
                    <div className=" text-center">
                        <h2 className='welcome_message mt-4 text-3xl'>WELCOME <span className="text-blue-700"><span>{(userData?.firstName)?.toUpperCase()} </span>
                            {(userData?.lastName)?.toUpperCase()}</span></h2>
                        <div className="slogan">
                            <h1 className="text-blue-500">
                                <span>Jostle for Undergraduate Roles and Opportunities</span>
                            </h1>
                        </div>


                        <form className='update_form text-start pt-8 w-3/4'>

                            <div className='my-6 first_las_name hidden'>
                                <label htmlFor=" firstName">First name</label>

                                <input
                                    className='firstName ml-4 mb-6  md:w-1/2 relative top-0 z-0  p-2 mr-2 opacity-70' type="text" name="firstName" id="firstName"
                                    placeholder={userData?.firstName}
                                />

                                <br />


                                <label htmlFor="lastName">Last name</label>


                                <input
                                    className='ml-4 lastName  md:w-1/2 relative top-0 z-0  p-2 mr-2 opacity-70' type="text" name="lastName" id="lastName"
                                    placeholder={userData?.lastName}
                                />
                            </div>
                            <div className='my-6'>
                                <label className='mr-2 text-xl' htmlFor="email">Email </label>

                                <span className='md:w-1/2 relative top-0 z-0  p-2 mr-2 opacity-70'> {userData?.email}</span>

                                <input
                                    className=' hidden email md:w-1/2 relative top-0 z-0  p-2 mr-2 opacity-70' type="email" name="email" id="email"
                                    placeholder={userData?.email}
                                />
                            </div>

                            <div className='my-6'>
                                <label className='mr-2 text-xl' htmlFor="phone">Phone </label>

                                <span className='md:w-1/2  p-2 mr-2 opacity-70'>{userData?.phone}</span>


                                <input
                                    className='hidden phone md:w-1/2  p-2 mr-2 opacity-70' type="tel" name="phone" id="phone"
                                    placeholder={userData?.phone}
                                />
                            </div>

                            <div className='my-6'>
                                <label className='mr-2 text-xl' htmlFor="role">Role </label>
                                <span className="md:w-1/2  p-2 mr-2 opacity-70">{userData?.role}</span>

                                <select

                                    name="role" className='role hidden  p-2 mr-2 opacity-70' id="role">

                                    <option value="USER">USER</option>
                                    <option value="COMPANY_HR">COMPANY_HR</option>
                                </select>
                            </div>

                            <div className='my-6'>
                                <label className='mr-2 text-xl' htmlFor="skills">date of birth </label>
                                <span
                                    className='md:w-1/2  p-2 mr-2 opacity-70' >{userData?.DateOB?.slice(0, 10)}</span>

                                <input
                                    className='DateOB hidden md:w-1/2  p-2 mr-2 opacity-70'
                                    type="text" name="DateOB" id="DateOB" placeholder={userData?.DateOB?.slice(0, 10)}
                                />
                            </div>

                            <div className='my-6'>
                                <label className='mr-2 text-xl' htmlFor="skills">Skills </label>
                                <span
                                    className='md:w-1/2  p-2 mr-2 opacity-70 text-nowrap' >{userData?.skills}</span>


                                <input
                                    className='hidden md:w-1/2 skills  p-2 mr-2 opacity-70'
                                    type="text" name="skills" id="skills" placeholder={userData?.skills}
                                />
                            </div>

                            <div className='my-6'>
                                <label className='mr-2 text-xl' htmlFor="skills">Add </label>
                                <span
                                    className=' p-2 mr-2 opacity-70'>
                                    {userData?.address}
                                </span>


                                <input
                                    className='hidden  address p-2 mr-2 opacity-70' type="text" name="address" id="address" placeholder={userData?.address}
                                />
                            </div>

                            <button type='button' onClick={onclickUpdate} className="update m-1 py-2 px-4 bg-slate-200 text-blue-500 font-semibold rounded-lg shadow-md hover:bg-blue-500 hover:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"> update</button>

                            <button onClick={handleSubmit} type='button' className="hidden save m-1 py-2 px-4 bg-slate-200 text-blue-500 font-semibold rounded-lg shadow-md hover:bg-blue-500 hover:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"> save</button>

                            <button type='button' onClick={onclickClose}
                                className="hidden close m-1 py-2 px-4 bg-slate-200 text-red-500 font-semibold rounded-lg shadow-md hover:bg-red-500 hover:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                            >close</button>
                        </form>
                    </div>

                </>

                <img src={logo} alt="logo_img" />


            </div>
            <div className="delete_account flex items-center justify-center">
                <button type='button' onClick={deleteAccount}
                    className=" w-1/2 close m-1 py-3 text-xl px-4 bg-slate-200 text-red-500 font-semibold rounded-lg shadow-md hover:bg-red-500 hover:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                >Delete account</button>
            </div>
        </>
    );
}

export default User;
