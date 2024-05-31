import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const [isLogin, setIsLogin] = useState(false);
  const [userAuth, setUserAuth] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    axios.get("http://localhost:8000/profile", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
      .then((res) => {
        setUserAuth(res.data.data);
        setIsLogin(true);
      })
      .catch((err) => {
        console.log(err);
        if (err.response && err.response.status === 401) {
          navigate("/login");
        }
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setIsLogin(false);
    navigate("/login");
  };

  const getLinkClass = (path) => (
    location.pathname === path
      ? "block py-2 px-3 md:p-0 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:dark:text-blue-500"
      : "block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
  );

  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="../public/logo.png" className="h-16" alt="" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Inventaris
            </span>
          </a>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            {isLogin ? (
              <button
                onClick={handleLogout}
                className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-900"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Login
              </Link>
            )}
            <button
              data-collapse-toggle="navbar-cta"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-cta"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-cta"
          >
            {isLogin && userAuth.role === 'admin' ? (
              <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                  <Link
                    to="/"
                    className={getLinkClass("/")}
                    aria-current="page"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/stuff"
                    className={getLinkClass("/stuff")}
                  >
                    Stuff
                  </Link>
                </li>
                <li>
                  <Link
                    to="/inbound"
                    className={getLinkClass("/inbound")}
                  >
                    Inbound
                  </Link>
                </li>
                <li>
                  <Link
                    to="/lending"
                    className={getLinkClass("/lending")}
                  >
                    Lending
                  </Link>
                </li>
                <li>
                  <Link
                    to="/user"
                    className={getLinkClass("/user")}
                  >
                    User
                  </Link>
                </li>
                <li>
                  <Link
                    to="/profile"
                    className={getLinkClass("/profile")}
                  >
                    Profile
                  </Link>
                </li>
              </ul>
            ) : isLogin && userAuth.role === 'staff' ? (
              <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                  <Link
                    to="/"
                    className={getLinkClass("/")}
                    aria-current="page"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/lending"
                    className={getLinkClass("/lending")}
                  >
                    Lending
                  </Link>
                </li>
              </ul>
            ) : (
              ""
            )}
          </div>
        </div>
      </nav>
    </>
  );
}