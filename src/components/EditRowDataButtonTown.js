import React from 'react';
import { useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import DeleteRowDataButtonFeedersOnTown from '../components/DeleteRowDataButtonFeedersOnTown';

const EditRowDataButtonTown = (props) => {
    const [xlist,setList] = useState([]); // list of  feeders
    const [listTownFormShow,setListTownFormShow] = useState(false);
    const [feedersontownList,setFeedersontownList] = useState([]);
    const [editTownFormShowName, setEditTownFormShowName] = useState(props.item.name);
    const [editTownFormShowWeb, setEditTownFormShowWeb] = useState(props.item.website);
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
                    todo.name = editTownFormShowName;
                    todo.website = editTownFormShowWeb;
                }
            }
        );
        props.setInitlist(newList);
        setShow("xx");
        const payload = [{_id: data._id},{name: editTownFormShowName,website: editTownFormShowWeb}];
        const requestOptions = {
            crossDomain:true,
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        };
        const ip = window.localStorage.getItem("JAED_IP");
        fetch(`${ip}towns/update`, requestOptions);
    }

    // run when opened: open users.json file and read its data
    useEffect(() => {
        const ip = window.localStorage.getItem("JAED_IP");
        //fetch('data/users.json') //fetch offline data here
        fetch(`${ip}feedersontowns/town/${props.item._id}`) //fetch offline data here
        .then((response) => response.json())
        .then((data) => {
            setFeedersontownList(data);
        });

        fetch(`${ip}feeders`) 
        .then((response) => response.json())
        .then((data) => {
            setList(data);
        });
    },[feedersontownList]);

    function feedersOnTownSelected(xtown_id,xfeeder_id){
        const ip = window.localStorage.getItem("JAED_IP");
        const data = {town_id : xtown_id,feeder_id : xfeeder_id};
        const requestOptions = {
            crossDomain:true,
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
        fetch(`${ip}feedersontowns/create`, requestOptions)
        .then((response) => response.json())
        .then((xdata) => {
            feedersontownList.push(data);
            setListTownFormShow(false);
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
                    Edit Town ID#{props.item._id}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="form-group">
                    <FloatingLabel controlId="floatingInput" label="Town Name" className="mb-3">
                        <Form.Control type="text" placeholder="name@example.com" value = {editTownFormShowName} onChange={(e)=>{setEditTownFormShowName(e.target.value);}}/>
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingInput" label="Town Official Web page URL" className="mb-3">
                        <Form.Control type="text" placeholder="name@example.com" value = {editTownFormShowWeb} onChange={(e)=>{setEditTownFormShowWeb(e.target.value);}}/>
                    </FloatingLabel>
                    <Button variant="danger" ><i class="fas fa-sitemap"></i>&nbsp;Check Website</Button><br/>
                    <Button variant="success" onClick={()=>setListTownFormShow(true)}>&nbsp;<i class="fas fa-angle-double-down"></i>&nbsp;Add Feeders&nbsp;&nbsp;&nbsp;&nbsp;</Button><br/> 
                    <Form.Label variant="primary">Feeders Supplying this town:</Form.Label> 
                    {feedersontownList.map(x => 
                                        <div className="flex bg-gray-50 p-0 m-2 shadow-lg rounded-lg border-2 border-blue-600">
                                            <div class="md:w-1/8">
                                                <DeleteRowDataButtonFeedersOnTown item = {x} setInitlist = {setList} initList = {xlist} />
                                            </div>
                                            <div class="md:w-5/8 flex items-center">
                                                <div class="ml-2 -mt-0">
                                                    :::&nbsp;
                                                    <b class="text-center text-lg uppercase">{getFeederName(x.feeder_id)}</b>
                                                    <p class="text-center text-gray-500 text-sm">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{getFeederAddress(x.feeder_id)}</p>
                                                </div>
                                            </div>
                                        </div>
                                )}  
                                </div>  
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={()=>onSubmitEditTodoClickHandler(props.item)}>
                  <i class="fas fa-database"></i>&nbsp;Save Changes
                </Button>
            </Modal.Footer>
        </Modal> 

        <Modal contentClassName="modal modal-sm modal-width" show={listTownFormShow} onHide={()=>setListTownFormShow(false)} aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Select A Feeder
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="bg-zinc-100 text-justify">
                    {xlist.map(x => 
                                        <div className="border-2 border-blue-400 bg-gray-50 p-2 m-2 drop-shadow rounded">
                                            <div><Button variant="success" onClick={()=>feedersOnTownSelected(props.item._id,x._id)}>&nbsp;<i class="fas fa-check-circle"></i>&nbsp;Select</Button></div>
                                            :::&nbsp;
                                            <b>{x.name}</b> {x.address} <br/>
                                        </div>
                                )}
                    </Modal.Body>
                </Modal>
    </>
  )
}

export default EditRowDataButtonTown
