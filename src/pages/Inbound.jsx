import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Table from "../components/Table";
import axios from "axios";

export default function Inbound() {
    const navigate = useNavigate();
    
    const dataThParent = [
        "#",
        "Date",
        "Stuff",
        "Total Stuff",
        "Proff File",
        "Action"
    ];

    const [inbound, setInbound] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/inbound-stuffs', {
            headers: {
                'Authorization': 'bearer ' + localStorage.getItem('access_token'),
            }
        })
            .then(res => {
                setInbound(res.data.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const coloumDataBase = {
        "stuff_id": " ",
        "date": " ",
        "total": " ",
        "proof_file": null
    };

    const button = [
        "delete",
        "show",
    ];

    const endpoints = {
        // "create": "http://localhost:8000/inbound-stuffs/store",
        "delete": "http://localhost:8000/inbound-stuffs/delete/{id}",
    };

    const coloumnDetailModalDelete = 'name';

    // const judulModalEdit = 'Inbound';

    // const inputData = {
    //     "date_time": {
    //         "type": "text",
    //         "options": null,
    //     },
    //     "total_stuff": {
    //         "type": "unique",
    //         "options": null,
    //     },
    //     "stuff_id": {
    //         "type": "unique",
    //         "options": null,
    //     },
    // };

    return (
        <>
            <Navbar />
            <div className="p-10">
                <button
                    className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
                    onClick={() => navigate('/inbound/create')}
                >
                    Create New Inbound
                </button>
                <Table 
                    dataTh={dataThParent}
                    dataTd={inbound}
                    columnDb={coloumDataBase}
                    buttonData={button}
                    endpoints={endpoints}
                    coloumnDetail={coloumnDetailModalDelete}
                    // judulModalEdit={judulModalEdit}
                    // inputData={inputData}
                />
            </div>
        </>
    );
}
