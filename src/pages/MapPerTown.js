import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import FeedersontownsList from '../components/FeedersontownsList';

import { useNavigate } from "react-router-dom";

const MapPerTown = () => {
    const navigate = useNavigate();
    const [xlist, setList] = useState([]);
    const [onShow,setOnShow] = useState(true);


    async function fetchInitialData(){
        var userIsLoggedIn =  window.localStorage.getItem("JAED_IS_LOGGED_IN");
        if (userIsLoggedIn==="false") navigate("/login");
        const ip = window.localStorage.getItem("JAED_IP");
        console.log(`${ip}towns`);
        const towns = await fetch(`${ip}towns`).then((response) => response.json());
        for (let i = 0;i < towns.length;i++){
            console.log(`${ip}feedersontowns/town/${towns[i]._id}`);
            towns[i].feeders = await fetch(`${ip}feedersontowns/town/${towns[i]._id}`).then((response) => response.json());
        }
        setList(towns);
    }

    useEffect(() => {
        fetchInitialData();
    },[]);

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
    <div className="ex1 bg-cover bg-center townCenterbg backdrop-blur-lg bg-white">
    <Modal contentClassName="modal modal-xl border-2" show={onShow} onHide={()=>setOnShow(false)} aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Town List
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
                                            <FeedersontownsList  items = {x}/>
                                        </div>)}
                                )}
                    </Modal.Body>
                </Modal>
    </div>
    </>
  )
}

export default MapPerTown
