import React from "react";
import Navbar from "../components/Navbar";
import Table from "../components/Table";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function StuffTrash() {
    const dataThParent = [
        "#",
        "Name",
        "Category",
        "Action"
        ]

  const [stuffs, setStuffs] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:8000/stuffs/trash", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        }
      })
      .then((res) => {
        setStuffs(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        // Navigate('/login');
      })
  }, []);

  const columnDatabase = {
    "name": null,
    "category": null,
   
  };

  const buttons = [
    "restore",
    "permanent-delete"
  ]

  const endpoints = {
    "restore" : "http://localhost:8000/stuffs/trash/restore/{id}",
    "permanent-delete" : "http://localhost:8000/stuffs/trash/permanent-delete/{id}",


  }
  const columnDetailModalDelete = ''

  const judulModalEdit = ''

  const inputData = {}
  
    return (
        <>
        <Navbar />
                    <Link to={'/stuff'}>
                    <button  type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                            Stuff
                        </button>
                    </Link>
                        
                   
      <Table dataTh={dataThParent} dataTd={stuffs} columnDb={columnDatabase} buttonData={buttons} endpoints={endpoints} columnDetail={columnDetailModalDelete} judulModalEdit={judulModalEdit} inputData={inputData}></Table>
        </>
    )
}