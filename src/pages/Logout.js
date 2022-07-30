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
var CryptoJS = require("crypto-js");

const Logout = (props) => {
    const navigate = useNavigate();
    const [userName,setUserName] = useState(props.userName);
    const [userPassword1,setUserPassword1] = useState("");
    const [userEncryptedData,setUserEncryptedData] = useState("");
    const [userDecryptedData,setUserDecryptedData] = useState(null);
    const [formShow,setFormShow]  = useState(true);

    /*
    // original data
    var data = [{ id: 1, name: 'Anil' }, { id: 2, name: 'Sunil' }]
    // Encrypt
    var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), 'my-secret-key@123').toString();
    //log encrypted data
    console.log('Encrypt Data -')
    console.log(ciphertext);
  
    // Decrypt
    var bytes = CryptoJS.AES.decrypt(ciphertext, 'my-secret-key@123');
    var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  
    //log decrypted Data
    console.log('decrypted Data -')
    console.log(decryptedData);
    */
  
    const tooltip = (
        <Tooltip id="tooltip-disabled">You are still logged in. Please click me to properly logout.</Tooltip>
    );
    const tooltip1 = (
        <Tooltip id="tooltip-disabled">cannot be closed!</Tooltip>
    );

    function onLoginConfirmButtonClickHandler(){
        window.localStorage.setItem("JAED_IS_LOGGED_IN","false");
        window.localStorage.setItem("JAED_USERNAME_IN","");
        props.setUserName("");
        navigate("/login");
    }

    function onLoginButtonClickHandler(){
        setFormShow(false);
    }

        // run when opened: open users.json file and read its data
        useEffect(() => {
            var userIsLoggedIn =  window.localStorage.getItem("JAED_IS_LOGGED_IN");
            if (userIsLoggedIn==="false") navigate("/login");
            const ip = window.localStorage.getItem("JAED_IP");
            fetch(`${ip}loginlist`) //fetch online data here
            .then((response) => response.json())
            .then((data) => {
                setUserEncryptedData(data.encrypted);
                var bytes = CryptoJS.AES.decrypt(userEncryptedData, 'garry123');
                setUserDecryptedData (JSON.parse(bytes.toString(CryptoJS.enc.Utf8)));
                var userIsLoggedIn =  window.localStorage.getItem("JAED_IS_LOGGED_IN");
                if (userIsLoggedIn==="false") navigate("/login");
            });
        });

  return (
    <>
    <div className="ex1 bg-cover bg-center loginCenterbg backdrop-blur-sm bg-white/30"></div>
    <div className="loginCenter bg-zinc-300 rounder-md">
                <ToastContainer>
                    <Toast delay={3000} autohide show={true} bg={"Danger"} key={"Danger"}>
                        <OverlayTrigger trigger="hover" placement="right" overlay={tooltip1}>
                            <Toast.Header>
                            <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                            <strong className="me-auto">LOGOUT</strong>
                            <small className="text-muted">
                                <Badge bg="secondary" onClick></Badge>
                            </small>
                            </Toast.Header>
                        </OverlayTrigger>
                        <Toast.Body>
                            <div className="rounded-md p-2">
                                <div className='py-2 px-0 rounded-md w-full flex justify-center'>
                                    <OverlayTrigger trigger="hover" placement="right" overlay={tooltip}>
                                        <Button variant='danger shadow-lg p-2 ' onClick = {()=>onLoginButtonClickHandler()}><i class='fas fa-user-shield'></i>&nbsp;&nbsp;Logout</Button> 
                                    </OverlayTrigger>
                                </div>
                            </div>
                        </Toast.Body>
                    </Toast>
                </ToastContainer>

                <Modal show={!formShow} onHide={()=>setFormShow(true)} aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Login Progress
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="bg-zinc-100 text-justify">
                        <div className='py-2 px-0 rounded-md w-full flex justify-center'>
                            <h5 className='text-justify'>Do you really want to logout?... <Spinner animation="border" variant="primary" hidden={false}/></h5>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary shadow-lg p-2" onClick={()=>setFormShow(true)}>
                            <i class="fa fa-close"></i>&nbsp;&nbsp;NO
                        </Button>
                        <Button variant="primary shadow-lg p-2" onClick={()=>onLoginConfirmButtonClickHandler()}>
                            <i class="fa fa-close"></i>&nbsp;&nbsp;YES
                        </Button>
                    </Modal.Footer>
                </Modal>
        </div>
    </>
)
}

export default Logout
