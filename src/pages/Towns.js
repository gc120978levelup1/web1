import {React,useState,useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import EditRowDataButtonTown from '../components/EditRowDataButtonTown';
import DeleteRowButtonTown from '../components/DeleteRowButtonTown';
import { useNavigate } from "react-router-dom";

const Towns = (props) => {
    const [xlist, setList] = useState([]);
    const [addTownFormShow, setAddTownFormShow] = useState(false);
    const [addTownFormShowName, setAddTownFormShowName] = useState("");
    const [addTownFormShowWeb, setAddTownFormShowWeb] = useState("");
    const [listTownFormShow, setListTownFormShow] = useState(false);
   
    const [townName, setTownName] = useState("");
    const navigate = useNavigate()    
    
    useEffect(() => {
        var userIsLoggedIn =  window.localStorage.getItem("JAED_IS_LOGGED_IN");
        if (userIsLoggedIn==="false") navigate("/login");
        const ip = window.localStorage.getItem("JAED_IP");
        fetch(`${ip}towns`) 
        .then((response) => response.json())
        .then((data) => {
            setList(data);
        });
    });

    function onClickSaveAddTown(){ //{name,website}
        const payload = {name: addTownFormShowName, website: addTownFormShowWeb};
        const requestOptions = {
            crossDomain:true,
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        };
        const ip = window.localStorage.getItem("JAED_IP");
        fetch(`${ip}towns/create`, requestOptions);
        setAddTownFormShow(false);
    };

  return (
    <>
      <div className="ex1 bg-cover bg-center townCenterbg backdrop-blur-sm bg-white/30"></div>
      <Button className="loginCenter" variant="primary" onClick={()=>setAddTownFormShow(true)}>Add Town</Button>
      <Button className="loginCenter1" variant="secondary" onClick={()=>setListTownFormShow(true)}>Show List</Button>
      <Modal contentClassName="modal modal-sm modal-width" show={addTownFormShow} onHide={()=>setAddTownFormShow(false)} aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Add Town
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="bg-zinc-100 text-justify">
                        <FloatingLabel controlId="floatingInput" label="Town Name" className="mb-3">
                            <Form.Control type="text" placeholder="name@example.com" onChange={(e)=>{setAddTownFormShowName(e.target.value);}}/>
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingInput" label="Town Official Web page URL" className="mb-3">
                            <Form.Control type="text" placeholder="name@example.com" onChange={(e)=>{setAddTownFormShowWeb(e.target.value);}}/>
                        </FloatingLabel>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="warning shadow-lg p-2" onClick={()=>onClickSaveAddTown()}>
                            <i class="fas fa-database"></i>&nbsp;&nbsp;SAVE
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal contentClassName="modal modal-sm modal-width" show={listTownFormShow} onHide={()=>setListTownFormShow(false)} aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Edit Towns
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="bg-zinc-100 text-justify">
                    {xlist.map(x => 
                                        <div className="bg-gray-50 p-2 m-2 shadow-lg rounded-lg border-2 border-blue-600">
                                            :::&nbsp;
                                            <b>{x.name}</b> {x.website} <br/>
                                            <EditRowDataButtonTown item = {x} setInitlist = {setList} initList = {xlist} />
                                            &nbsp;
                                            <DeleteRowButtonTown item = {x} setInitlist = {setList} initList = {xlist} />
                                        </div>
                                )}
                    </Modal.Body>
                </Modal>
    </>
  )
}

export default Towns
