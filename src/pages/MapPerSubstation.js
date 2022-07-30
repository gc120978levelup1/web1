import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import FeedersonsubstationsList from '../components/FeedersonsubstationsList';

import { useNavigate } from "react-router-dom";

const MapPerSubstation = () => {
    const navigate = useNavigate();
    const [xlist, setList] = useState([]);
    const [onShow,setOnShow] = useState(true);


    async function fetchInitialData(){
        var userIsLoggedIn =  window.localStorage.getItem("JAED_IS_LOGGED_IN");
        if (userIsLoggedIn==="false") navigate("/login");
        const ip = window.localStorage.getItem("JAED_IP");
        const Substations = await fetch(`${ip}Substations`).then((response) => response.json());
        for (let i = 0;i < Substations.length;i++){
            Substations[i].feeders = await fetch(`${ip}feedersonSubstations/Substation/${Substations[i]._id}`).then((response) => response.json());
        }
        setList(Substations);
    }

    useEffect(() => {
        fetchInitialData();
    });

    const [searchValue, setSearchValue] = useState('');
    async function onSearchButtonClickHandler(){
        navigate(`/`);
        const ip = window.localStorage.getItem("JAED_IP");
        const results = await fetch(`${ip}custsongeojsons/ofcid/${searchValue}`).then((response) => response.json());
        window.localStorage.setItem("JAED_CUSTOMER_ID",results[0].cid);
        navigate(`/CoolMap/${results[0].geojson_id}/searchcid/${results[0].cid}`);
    }

  return (
    <>
    <div className="ex1 bg-cover bg-center substationCenterbg backdrop-blur-lg bg-white/30">
    <Modal contentClassName="modal modal-xl" show={onShow} onHide={()=>setOnShow(false)} aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Substations
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="bg-zinc-100 text-justify">
                        <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                                onChange={(e) =>setSearchValue(e.target.value)}
                                />
                            <Button variant="outline-success" onClick={()=>onSearchButtonClickHandler()}>Search</Button>
                        </Form>
                        {xlist.map((x) => { return(
                                        <div className="bg-gray-50 p-2 m-2 drop-shadow rounded border-2 border-blue-700">
                                            :::&nbsp;
                                            <b>{x.name}</b><br/>
                                            <FeedersonsubstationsList  items = {x}/>
                                        </div>)}
                                )}
                    </Modal.Body>
                </Modal>
    </div>
    </>
  )
}

export default MapPerSubstation
