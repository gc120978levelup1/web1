import React from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Badge from 'react-bootstrap/Badge';
import Tooltip from 'react-bootstrap/Tooltip';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import DeleteUserRowButton from '../components/DeleteUserRowButton';
import EditRowDataButton from '../components/EditRowDataButton';
var CryptoJS = require("crypto-js");

const DeleteUser = () => {
    const [userEncryptedData,setUserEncryptedData] = useState("");
    const [userEncryptedData_id,setUserEncryptedData_id] = useState("");
    const [userDecryptedData,setUserDecryptedData] = useState(null);
    const [formShow,setFormShow] = useState(true);
    const [list1,setList1] = useState(null);

    const navigate = useNavigate();
    const tooltip = (
        <Tooltip id="tooltip-disabled">Click me to save the current users.</Tooltip>
    );
    const tooltip1 = (
        <Tooltip id="tooltip-disabled">cannot be closed!</Tooltip>
    );

    const onCreateInitialUserSaveButtonClickHandler1 = () => {//save and download
        userDecryptedData.results.users=[...list1];
        const EncryptedData1 = CryptoJS.AES.encrypt(JSON.stringify(userDecryptedData), 'garry123').toString();
        const xEncryptedData1 = [{_id:userEncryptedData_id},{encrypted: EncryptedData1}];
        const requestOptions = {
            crossDomain:true,
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(xEncryptedData1)
        };
        const ip = window.localStorage.getItem("JAED_IP");
        fetch(`${ip}loginlist/update`, requestOptions)
        setFormShow(false);
    }

    // run when opened: open users.json file and read its data
    useEffect(() => {
        var userIsLoggedIn =  window.localStorage.getItem("JAED_IS_LOGGED_IN");
        var username = window.localStorage.getItem("JAED_USERNAME_IN");
        if (userIsLoggedIn==="false") navigate("/login");
        if (username!=="admin") navigate("/login");
        const ip = window.localStorage.getItem("JAED_IP");
        fetch(`${ip}loginlist`) //fetch online data here
            .then((response) => response.json())
            .then((data) => {
                setUserEncryptedData_id(data._id);
                setUserEncryptedData(data.encrypted);
                var bytes = CryptoJS.AES.decrypt(userEncryptedData, 'garry123');
                if (list1===null) {
                    setUserDecryptedData (JSON.parse(bytes.toString(CryptoJS.enc.Utf8)));
                    setList1(userDecryptedData.results.users);
                }
        });
    });

  return (
    <>
    <div className="ex1 bg-cover bg-center loginCenterbg backdrop-blur-sm bg-white/30"></div>
    <div className="loginCenter bg-zinc-300 rounder-md">
                <ToastContainer>
                    <Toast delay={3000} autohide show={formShow} bg={"Danger"} key={"Danger"}>
                        <OverlayTrigger trigger="hover" placement="right" overlay={tooltip1}>
                            <Toast.Header>
                            <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                            <strong className="me-auto">USERS</strong>
                            <small className="text-muted">
                                <Badge bg="secondary" onClick></Badge>
                            </small>
                            </Toast.Header>
                        </OverlayTrigger>
                        <Toast.Body>
                            <div className="rounded-md p-2">
                                {(list1 !== null)?(<>
                                    {list1.map(x => 
                                        <div className="bg-gray-50 p-2 m-2 drop-shadow rounded border-2 border-blue-700">
                                            <DeleteUserRowButton setInitlist={setList1} initlist={list1} item = {x} />
                                            <h5>{x.username}</h5>
                                        </div>
                                    )}
                                    <div className='py-2 px-0 rounded-md w-full flex justify-end'>
                                         &nbsp;&nbsp;
                                        <OverlayTrigger trigger="hover" placement="right" overlay={tooltip}>
                                            <Button variant='warning shadow-lg p-2 ' onClick = {onCreateInitialUserSaveButtonClickHandler1}><i class='fas fa-user-shield'></i>&nbsp;&nbsp;Save User File</Button> 
                                        </OverlayTrigger>
                                    </div>
                                </>):(<></>)}
                            </div>
                        </Toast.Body>
                    </Toast>
                </ToastContainer>
        </div>
        <Modal show={!formShow} onHide={()=>setFormShow(true)} aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Initial User Data processing
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="bg-zinc-100 text-justify">
                        <div className='py-2 px-0 rounded-md w-full flex justify-center'>
                            <h5 className='text-justify'>Users data has been saved...</h5>
                        </div>
                        <div className='py-2 px-0 rounded-md w-full flex justify-center'>
                            <h5 className='text-justify'>Thank you for waiting... <Spinner animation="border" variant="primary" hidden={false}/></h5>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success shadow-lg p-2" onClick={()=>setFormShow(true)}>
                            <i class="fa fa-close"></i>&nbsp;&nbsp;OK
                        </Button>
                    </Modal.Footer>
                </Modal>
    </>
)
}

export default DeleteUser
