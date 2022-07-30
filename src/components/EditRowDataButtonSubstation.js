import React from 'react';
import { useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import DeleteRowDataButtonFeedersOnSubstation from '../components/DeleteRowDataButtonFeedersOnSubstation';

const EditRowDataButtonSubstation = (props) => {
    const [xlist,setList] = useState([]); // list of  feeders
    const [listSubstationFormShow,setListSubstationFormShow] = useState(false);
    const [feedersonSubstationList,setFeedersonSubstationList] = useState([]);
    const [editSubstationFormShowName, setEditSubstationFormShowName] = useState(props.item.name);
    const [editSubstationFormShowWeb, setEditSubstationFormShowWeb] = useState(props.item.address);
    const [addSubstationFormShowMVA, setAddSubstationFormShowMVA] = useState(props.item.MVA);
    const [addSubstationFormShowNFeeders,setAddSubstationFormShowNFeeders] = useState(props.item.NosFeeders);
    const [show1, setShow] = useState("xx");
    const handleClose = () => setShow("xx");

    function getFeederName(feeder_id){
        var ret = "feeder not known";
        xlist.forEach((feeder)=>{
            if (feeder._id===feeder_id) ret = feeder.name;
        });
        return ret
    }

    function getFeederAddress(feeder_id){
        var ret = "feeder not known";
        xlist.forEach((feeder)=>{
            if (feeder._id===feeder_id) ret = feeder.address;
        });
        return ret
    }

    function EditOnClickHandler(dataToShow){
        setShow(dataToShow._id);
    }

    function showThisForm(dataToShow){
        var showme = false;
        if (dataToShow._id===show1) showme = true;
        return showme; 
    }

    function onSubmitEditTodoClickHandler(data) {
        const newList = [...props.initList];
        newList.forEach(
            todo => {
                if (todo._id === data._id){
                    todo.name = editSubstationFormShowName;
                    todo.address = editSubstationFormShowWeb;
                    todo.MVA = addSubstationFormShowMVA;
                    todo.NosFeeders= addSubstationFormShowNFeeders;
                }
            }
        );
        props.setInitlist(newList);
        setShow("xx");
        const payload = [{_id: data._id},{name: editSubstationFormShowName, address: editSubstationFormShowWeb, MVA: addSubstationFormShowMVA, NosFeeders:addSubstationFormShowNFeeders}];
        const requestOptions = {
            crossDomain:true,
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        };
        const ip = window.localStorage.getItem("JAED_IP");
        fetch(`${ip}substations/update`, requestOptions)
        .then((response) => response.json())
        .then((data) => {
        });
    }

    // run when opened: open users.json file and read its data
    useEffect(() => {
        const ip = window.localStorage.getItem("JAED_IP");
        //fetch('data/users.json') //fetch offline data here
        fetch(`${ip}feedersonsubstations/substation/${props.item._id}`) //fetch offline data here
        .then((response) => response.json())
        .then((data) => {
            setFeedersonSubstationList(data);
        });

        fetch(`${ip}feeders`) 
        .then((response) => response.json())
        .then((data) => {
            setList(data);
        });
    },[feedersonSubstationList]);

    function feedersOnSubstationSelected(xSubstation_id,xfeeder_id){
        const ip = window.localStorage.getItem("JAED_IP");
        const data = {substation_id : xSubstation_id,feeder_id : xfeeder_id};
        const requestOptions = {
            crossDomain:true,
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
        fetch(`${ip}feedersonsubstations/create`, requestOptions)
        .then((response) => response.json())
        .then((xdata) => {
            feedersonSubstationList.push(data);
            setListSubstationFormShow(false);
        })
    }

  return (
    <>
        <Button variant="success p-1" onClick={()=>EditOnClickHandler(props.item)}>
            Edit
        </Button>
        <Modal show={showThisForm(props.item)} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Edit row #{props.item._id}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="form-group">
                    <FloatingLabel controlId="floatingInput" label="Substation Name" className="mb-3">
                        <Form.Control type="text" placeholder="name@example.com" value = {editSubstationFormShowName} onChange={(e)=>{setEditSubstationFormShowName(e.target.value);}}/>
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingInput" label="Substation Address" className="mb-3">
                        <Form.Control type="text" placeholder="name@example.com" value = {editSubstationFormShowWeb} onChange={(e)=>{setEditSubstationFormShowWeb(e.target.value);}}/>
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingInput" label="MVA Rating" className="mb-3">
                        <Form.Control type="number" placeholder="name@example.com" value = {addSubstationFormShowMVA} onChange={(e)=>{setAddSubstationFormShowMVA(e.target.value);}}/>
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingInput" label="Nos. of Feeders" className="mb-3">
                        <Form.Control type="number" placeholder="name@example.com" value = {addSubstationFormShowNFeeders}  onChange={(e)=>{setAddSubstationFormShowNFeeders(e.target.value);}}/>
                    </FloatingLabel>
                    <Button variant="success" onClick={()=>setListSubstationFormShow(true)}>&nbsp;<i class="fas fa-angle-double-down"></i>&nbsp;Add Feeders</Button><br/> 
                    {feedersonSubstationList.map(x => 
                                        <div className="bg-gray-50 p-2 m-2 shadow-lg rounded-lg border-2 border-blue-600">
                                            <DeleteRowDataButtonFeedersOnSubstation item = {x} setInitlist = {setList} initList = {xlist} />
                                            &nbsp;:::&nbsp;
                                            <b>{getFeederName(x.feeder_id)}</b><br/>
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{getFeederAddress(x.feeder_id)}
                                        </div>
                                )}  
                                </div>  
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={()=>onSubmitEditTodoClickHandler(props.item)}>
                    &nbsp;<i class="fas fa-database"></i>&nbsp;Save Changes
                </Button>
            </Modal.Footer>
        </Modal> 

        <Modal contentClassName="modal modal-sm modal-width" show={listSubstationFormShow} onHide={()=>setListSubstationFormShow(false)} aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Select A Feeder
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="bg-zinc-100 text-justify">
                    {xlist.map(x => 
                                        <div className="border-2 border-blue-400 bg-gray-50 p-2 m-2 drop-shadow rounded">
                                            <div><Button variant="success" onClick={()=>feedersOnSubstationSelected(props.item._id,x._id)}>&nbsp;<i class="fas fa-check-circle"></i>&nbsp;Select</Button></div>
                                            :::&nbsp;
                                            <b>{x.name}</b> {x.address} <br/>
                                        </div>
                                )}
                    </Modal.Body>
                </Modal>
    </>
  )
}

export default EditRowDataButtonSubstation
