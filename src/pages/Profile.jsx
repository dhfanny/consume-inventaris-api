import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Profile() {
    
    const [dataProfile, setDataProfile] = useState({});

    useEffect(() => {
        axios.get('http://localhost:8000/profile',{
            headers: {
                'Authorization': 'Bearer' + localStorage.getItem('access_token')
            }
        })
        .then(res => {
         setDataProfile(res.data.data)
        })
        .catch(err => {
        console.log(err)
        Navigate('/login');
        })
    }, []);

    const Navigate = useNavigate();

    function handleLogout() {
        axios.get('http://localhost:8000/logout',{
            headers: {
                'Authorization': 'Bearer' + localStorage.getItem('access_token')
            }
        })
        .then(res => {
        // abis logout berhasil, hapus token di localstorage
         localStorage.removeItem('access_token')
         // arahkan ke halaman login
         Navigate('/login');
        })
        .catch(err => {
        console.log(err)
        })
    }

    return (
        <>
            <Navbar></Navbar>
       
        <div className="block m-auto mt-10 w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mt-20">
            <div className="flex flex-col items-center pb-10 pt-10">
                <FontAwesomeIcon icon="fa-solid fa-user" className="w-20 h-20 mb-3 text-gray-500" />
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{dataProfile.username}</h5>
                <span className="text-sm text-gray-500 dark:text-gray-400">{dataProfile.email}</span>
                <div className="flex mt-4 md:mt-6">
                    <Link to={'/dashboard'} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Dashboard</Link>
                    <a onClick={handleLogout} className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Logout</a>
                </div>
            </div>
        </div>
                </>
    )
}