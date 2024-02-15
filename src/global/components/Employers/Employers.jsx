import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { failToaster } from '../../../services/toster';

const Employers = () => {
  const [companies, setCompanies] = useState([]);
  const getAllCompanies = async () => {
    const result = await axios.get("http://localhost:10000/api/v1/company/all")
    if (!result) {
      failToaster("failed to get all companies");
    }
    else {
      setCompanies(result.data.result);
    }
  }
  useEffect(() => {
    getAllCompanies();
  }, [])

  return (
    <div className='employers p-4 mt-32 mb-4'>
      {companies.length == 0 ? (<>
        <h1>nothing found</h1>
      </>) : (<div className='companies capitalize overflow-hidden'>
        {
          companies?.map((company) => (
            <div className='company&hr relative text-sm flex md:flex-row items-start justify-between border p-4 my-10  flex-col'>
              <div className=" company w-full md:w-3/4 sm:w-full border-b-2">
                <div className="name absolute bottom-full left-0 text-blue-500 bg-slate-200 p-1 ">{company?.companyName}</div>
                <div className="name absolute bottom-full right-0 text-indigo-500 bg-slate-200 p-1 ">{company?.companyHr?.firstName}</div>
                <div className="industry">
                  <span className='text-indigo-500'>industry: </span>
                  <span className="opacity-80">{company?.industry}</span>
                </div>
                <div className="numOfEmployees">
                  <span className='text-indigo-500'>employees: </span>
                  <span className="opacity-80">{company?.numOfEmployees?.from}-{company?.numOfEmployees?.to}</span>
                </div>

                <div className="address">
                  <span className='text-indigo-500'>address: </span>
                  <span className="opacity-80">{company?.address?.country}/ {company?.address?.governRate}/ {company?.address?.postalCode}</span>
                </div>

                <div className="about w-3/4">
                  <span className='text-indigo-500'>about: </span>
                  <span className="opacity-65">{company?.description}</span>
                </div>

                <div className="email">
                  <span className='text-indigo-500'>email: </span>
                  <a className="opacity-80" href={`mailto:${company?.email}`}>{company?.email}</a>
                </div>
              </div>

              <div className="hr flex items-start flex-col md:w-1/4 border-b-2 mt-2">
                <div className="email">
                  <span className='text-blue-500'>HR Email: </span>
                  <a className="opacity-80" href={`mailto:${company?.companyHr?.email}`}>{company?.companyHr?.email}</a>
                </div>
                <div className="phone">
                  <span className='text-blue-500'>phone: </span>
                  <span className="opacity-80">{company?.companyHr?.phone}</span>
                </div>

              </div>


            </div>
          ))
        }
      </div>)}
    </div>
  );
}

export default Employers;
