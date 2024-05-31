import React, { useState } from "react";
import ModalAdd from "./ModalAdd";
import ModalDelete from "./ModalDelete";
import ModalEdit from "./ModalEdit";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Table({ columnDb, columnDetail, dataTh, dataTd, buttonData, endpoints, judulModalEdit, inputData, onSubmit, dataDetail }) {
    const [isOpenModalAdd, setIsOpenModalAdd] = useState(false);
    const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
    const [isOpenModalEdit, setIsOpenModalEdit] = useState(false);
    const [endpointReplaced, setEndpointReplaced] = useState({});

    const navigate = useNavigate();

    function handleModalAdd() {
        const replace = {
            "store": endpoints['store']
        }
        setEndpointReplaced(replace);
        setIsOpenModalAdd(true);
    }

    function handleModalDelete(id) {
        const detailReplaced = endpoints['detail'].replace('{id}', id);
        const deleteReplaced = endpoints['delete'].replace('{id}', id);
        const replaced = {
            "detail": detailReplaced,
            "delete": deleteReplaced,
        }
        setEndpointReplaced(replaced);
        setIsOpenModalDelete(true);
    }

    function handleModalEdit(id) {
        const detailReplaced = endpoints['detail'].replace('{id}', id);
        const updateReplaced = endpoints['update'].replace('{id}', id);
        const replaced = {
            "detail": detailReplaced,
            "update": updateReplaced,
        }
        setEndpointReplaced(replaced);
        setIsOpenModalEdit(true);
    }

    function handleRestore(id) {
        let endpointRestore = endpoints['restore'].replace("{id}", id);
        axios.get(endpointRestore, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            }
        })
        .then(res => {
            navigate('/stuff');
        })
        .catch(err => {
            console.log(err);
        })
    }

    // Sort dataTd by the "name" column
    // toLowerCase buat mengubah menjadi huruf kecil smua
    // const sortedDataTd = [...Object.entries(dataTd)].sort((a, b) => {
    //     const nameA = a[1].name.toLowerCase();
    //     const nameB = b[1].name.toLowerCase();
    //     return nameA > nameB ? -1 : nameA > nameB ? 1 : 0;
    // });

    return (
        <>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg px-20 py-10 mt-8">
                <div className="flex justify-end mb-5">
                    {buttonData.includes("create") && (
                        <button onClick={handleModalAdd} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                            Create
                        </button>
                    )}
                    {buttonData.includes("trash") && (
                        <Link to={'/stuffs/trash'} type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                            Trash
                        </Link>
                    )}
                </div>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-center">
                        <tr>
                            {dataTh.map((data, index) => (
                                <th scope="col" className="px-6 py-3" key={index}>{data}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(dataTd).map(([index, value]) => (
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-center" key={index}>
                                <td className="px-6 py-4">{parseInt(index) + 1}.</td>
                                {Object.entries(columnDb).map(([i, v]) => (
                                    <td className="px-6 py-4" key={i}>
                                        {!v ? value[i] : value[i.replace(/[!@#$%^&]/, '')] ? value[i.replace(/[!@#$%^&]/, '')][v] : 0}
                                    </td>
                                ))}
                                <td className="px-6 py-4 text-center">
                                    {buttonData.includes("edit") && (
                                        <a onClick={() => handleModalEdit(value.id)} href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                            Edit
                                        </a>
                                    )}
                                    {buttonData.includes("delete") && (
                                        <a onClick={() => handleModalDelete(value.id)} href="#" className="font-medium text-blue-600 dark:text-red-500 hover:underline ml-3">
                                            Delete
                                        </a>
                                    )}
                                    {buttonData.includes("restore") && (
                                        <a onClick={() => handleRestore(value.id)} href="#" className="font-medium text-blue-600 dark:text-red-500 hover:underline ml-3">
                                            Restore
                                        </a>
                                    )}
                                    {buttonData.includes("permanent-delete") && (
                                        <a onClick={() => handleModalDelete(value.id)} href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline ml-3">
                                            Permanent-delete
                                        </a>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <ModalAdd isOpen={isOpenModalAdd} closeModal={() => setIsOpenModalAdd(false)} judulModaL={judulModalEdit} inputData={inputData} endpoints={endpointReplaced} />
            <ModalDelete isOpen={isOpenModalDelete} closeModal={() => setIsOpenModalDelete(false)} endpoints={endpointReplaced} columnDetail={columnDetail} />
            <ModalEdit isOpen={isOpenModalEdit} closeModal={() => setIsOpenModalEdit(false)} judulModal={judulModalEdit} inputData={inputData} endpoints={endpointReplaced} />
        </>
    )
}