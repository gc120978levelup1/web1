import {React,useState,useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import EditRowDataButtonSubstation from '../components/EditRowDataButtonSubstation';
import DeleteRowButtonSubstation from '../components/DeleteRowButtonSubstation';
import { useNavigate } from "react-router-dom";

const Substations = (props) => {
    const [xlist, setList] = useState([]);
    const [addSubstationFormShow, setAddSubstationFormShow] = useState(false);
    const [addSubstationFormShowName, setAddSubstationFormShowName] = useState("");
    const [addSubstationFormShowWeb, setAddSubstationFormShowWeb] = useState("");
    const [addSubstationFormShowMVA, setAddSubstationFormShowMVA] = useState("");
    const [addSubstationFormShowNFeeders, setAddSubstationFormShowNFeeders] = useState("");
    const [listSubstationFormShow, setListSubstationFormShow] = useState(false);
   
    const [SubstationName, setSubstationName] = useState("");
    const navigate = useNavigate()    
    
    useEffect(() => {
        var userIsLoggedIn =  window.localStorage.getItem("JAED_IS_LOGGED_IN");
        if (userIsLoggedIn==="false") navigate("/login");
        const ip = window.localStorage.getItem("JAED_IP");
        fetch(`${ip}substations`) 
        .then((response) => response.json())
        .then((data) => {
            setList(data);
        });
    });

    function onClickSaveAddSubstation(){ //{name,address,MVA,NosFeeders};
        const payload = {name: addSubstationFormShowName, address: addSubstationFormShowWeb, MVA: addSubstationFormShowMVA, NosFeeders:addSubstationFormShowNFeeders};
        const requestOptions = {
            crossDomain:true,
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        };
        const ip = window.localStorage.getItem("JAED_IP");
        fetch(`${ip}substations/create`, requestOptions);
        setAddSubstationFormShow(false);
    };

  return (
    <>
      <div className="ex1 bg-cover bg-center substationCenterbg backdrop-blur-sm bg-white/30"></div>
      <Button className="loginCenter" variant="primary" onClick={()=>setAddSubstationFormShow(true)}>Add Substation</Button>
      <Button className="loginCenter1" variant="secondary" onClick={()=>setListSubstationFormShow(true)}>Show List</Button>
      <Modal contentClassName="modal modal-sm modal-width" show={addSubstationFormShow} onHide={()=>setAddSubstationFormShow(false)} aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Add Substation
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="bg-zinc-100 text-justify">
                        <FloatingLabel controlId="floatingInput" label="Substation Name" className="mb-3">
                            <Form.Control type="text" placeholder="name@example.com" onChange={(e)=>{setAddSubstationFormShowName(e.target.value);}}/>
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingInput" label="Substation Address" className="mb-3">
                            <Form.Control type="text" placeholder="name@example.com" onChange={(e)=>{setAddSubstationFormShowWeb(e.target.value);}}/>
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingInput" label="MVA Rating" className="mb-3">
                            <Form.Control type="number" placeholder="name@example.com" onChange={(e)=>{setAddSubstationFormShowMVA(e.target.value);}}/>
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingInput" label="Nos. of Feeders" className="mb-3">
                            <Form.Control type="number" placeholder="name@example.com" onChange={(e)=>{setAddSubstationFormShowNFeeders(e.target.value);}}/>
                        </FloatingLabel>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="warning shadow-lg p-2" onClick={()=>onClickSaveAddSubstation()}>
                        <i class="fas fa-database"></i>&nbsp;&nbsp;SAVE
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal contentClassName="modal modal-sm modal-width" show={listSubstationFormShow} onHide={()=>setListSubstationFormShow(false)} aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Edit Substations
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="bg-zinc-100 text-justify">
                    {xlist.map(x => 
                                        <div className="bg-gray-50 p-2 m-2 shadow-lg rounded-lg border-2 border-blue-600">
                                            :::&nbsp;
                                            <b>{x.name}</b> {x.website} <br/>
                                            <EditRowDataButtonSubstation item = {x} setInitlist = {setList} initList = {xlist} />
                                            &nbsp;
                                            <DeleteRowButtonSubstation item = {x} setInitlist = {setList} initList = {xlist} />
                                        </div>
                                )}
                    </Modal.Body>
                </Modal>
    </>
  )
}

export default Substations
