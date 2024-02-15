import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ userDataToken }) => {
  useEffect(() => {
    // on scroll change navbar color to dark and bg to light
    window.addEventListener('scroll', () => {
      if (window.scrollY >= 150) {
        document.querySelector('.nav_bar').style.backgroundColor = '#fafafa';
        document.querySelector('.nav_bar').style.color = '#1f1f1f';
      } else {
        document.querySelector('.nav_bar').style.backgroundColor = '';
        document.querySelector('.nav_bar').style.color = '';
      }
    });

    document.querySelectorAll(".nav_sm_list a").forEach((link) => {
      link.addEventListener("click", () => {
        document.querySelectorAll(".nav_sm_list a").forEach((l) => {
          l.classList.remove("bg-blue-700");
        });
        link.classList.add("bg-blue-700");
      });
    });

  }, []);

  let [counter, setCounter] = useState(0);

  const counterPlus = () => {
    counter++;
    setCounter(counter);
  };

  const onClickHamburgIcon = () => {
    if (counter % 2 === 0) {
      document.querySelector('.nav_sm_list').classList.remove('hidden');
    } else {
      document.querySelector('.nav_sm_list').classList.add('hidden');
    }
  };


  return (
    <div className='nav_bar fixed top-0 w-screen text-slate-200 drop-shadow-lg z-5'>
      {/* web nav */}
      <div className="container p-4 md:flex justify-between items-center hidden sm:flex">
        <div className="logo w-1/5">
          <h1 className="text-5xl text-center"><Link to={"/"}>JURO</Link></h1>
        </div>
        <div className="nav_list w-3/4 p-2 flex justify-around items-center">
          <ul>
            <Link className="m-2" to={"/"}>Home </Link>
            <Link className="m-2" to={"/findJobs"}> Find jobs </Link>
            <Link className="m-2" to={"/employers"}>Employers </Link>
            {userDataToken?.role && <Link className="m-2" to={"/profile"}>Profile </Link>}
          </ul>
          {userDataToken ?
            <div className="features">
              <button className="m-1 py-2 px-4 bg-slate-200 text-blue-500 font-semibold rounded-lg shadow-md hover:bg-blue-500 hover:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
                <Link to={"/"} onClick={async () => {
                  await localStorage.clear();
                  await window.location.reload();
                }}>
                  Logout
                </Link>
              </button>
            </div> :
            <div className="features">
              <button className="m-1 py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
                <Link to={"/signup"}>
                  Login / Register
                </Link>
              </button>
              <button className="m-1 py-2 px-4 bg-slate-200 text-blue-500 font-semibold rounded-lg shadow-md hover:bg-blue-500 hover:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
                <Link>
                  Add Job
                </Link>
              </button>
            </div>
          }



        </div>
      </div>
      {/* mobile nav */}
      <nav className="bg-white border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 md:hidden">
          <h1 className="text-5xl text-center text-blue-500"><Link to={"/"}>JURO</Link></h1>
          <button data-collapse-toggle="navbar-default" type="button" onClick={() => { onClickHamburgIcon(); counterPlus(); }} className="hambruger_btn inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-blue-500 dark:focus:ring-blue-600" aria-controls="navbar-default" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
          <div className="hidden w-full md:block md:w-auto nav_sm_list" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link to={"/"} href="#" className="home block py-2 px-3 text-white bg-blue-700 rounded " aria-current="page">Home</Link>
              </li>
              <li>
                <Link to={"/findjobs"} href="#" className="find_job block py-2 px-3 rounded">Find jobs</Link>
              </li>
              <li>
                <Link to={"/employers"} href="#" className="employers block py-2 px-3 rounded">Employers</Link>
              </li>
              {userDataToken?.role && <li>
                <Link className="profile block py-2 px-3 rounded" to={"/profile"}>Profile </Link>
              </li>}

            </ul>
            {userDataToken ?
              <div className="features">
                <button className="m-1 w-full py-2 px-4 bg-slate-200 text-blue-500 font-semibold rounded-lg shadow-md hover:bg-blue-500 hover:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
                  <Link to={"/"} onClick={async () => {
                    await localStorage.clear();
                    await window.location.reload();
                  }}>
                    Logout
                  </Link>
                </button>
              </div>
              : <div className="features flex items-center justify-between my-1">
                <button className="w-1/2 py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
                  <Link to={"/signup"}>
                    Login / Register
                  </Link>
                </button>
                <button className="w-1/3 py-2 px-4 bg-slate-200 text-blue-500 font-semibold rounded-lg shadow-md hover:bg-blue-500 hover:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
                  <Link>
                    Add Job
                  </Link>
                </button>
              </div>}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
