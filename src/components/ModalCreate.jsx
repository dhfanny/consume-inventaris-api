import React, { useState } from "react";
import axios from "axios";

export default function ModalAdd({ isOpen, closeModal, inputData, judulModal, onSubmit, endpoints }) {
    const [formValues, setFormValues] = useState(
        Object.keys(inputData).reduce((acc, key) => {
            acc[key] = "";
            return acc;
        }, {})
    );

    const [error, setError] = useState([])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSubmit) {
            onSubmit(formValues);
        }
        closeModal();
    };

    function handleStore() {
        axios.post(endpoints['store'], payload, {
            headers: {
                'Authorization': 'Bearer' + localStorage.getItem('access_token'),
            }
        })
        .then(res => {
            window.location.reload();
        })
        .catch(err => {
            console.log(err)
            if (err.response.status == 401) {
                navigate('/login?message=' + encodeURIComponent('Anda belum login!'));
            } else {
                setError(err.response.data);
            }
        })
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
            <div className="bg-white rounded-lg overflow-hidden max-w-md w-full">
                <div className="p-6">
                    <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                        <h3 className="text-lg font-semibold text-gray-900">{judulModal}</h3>
                        <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 focus:outline-none">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>
                    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                        {Object.entries(inputData).map(([key, item]) => (
                            item.type === "select" ? (
                                <div key={key}>
                                    <label htmlFor={key} className="block mb-2 text-sm font-medium text-gray-700">{key}</label>
                                    <select name={key} id={key} value={formValues[key]} onChange={handleChange} className="bg-gray-100 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                        <option hidden disabled>Select {key}</option>
                                        {item.options.map((opt, index) => (
                                            <option key={index} value={opt}>{opt}</option>
                                        ))}
                                    </select>
                                </div>
                            ) : (
                                <div key={key}>
                                    <label htmlFor={key} className="block mb-2 text-sm font-medium text-gray-700">{key}</label>
                                    <input type={item.type} name={key} id={key} value={formValues[key]} onChange={handleChange} className="bg-gray-100 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                                </div>
                            )
                        ))}
                        <button type="submit"  onClick={handleStore} className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5">Create {judulModal}</button>
                    </form>
                </div>
            </div>
        </div>
    );
}