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

const CreateUser = () => {
    const [userName,setUserName] = useState("");
    const [userPassword1,setUserPassword1] = useState("");
    const [userPassword2,setUserPassword2] = useState("");
    const [userEncryptedData,setUserEncryptedData] = useState("");
    const [userEncryptedData_id,setUserEncryptedData_id] = useState("");
    const [userDecryptedData,setUserDecryptedData] = useState(null);
    const [formShow,setFormShow] = useState(true);

    const navigate = useNavigate();
    const tooltip = (
        <Tooltip id="tooltip-disabled">Enter proper email and password and click me.</Tooltip>
    );
    const tooltip1 = (
        <Tooltip id="tooltip-disabled">cannot be closed!</Tooltip>
    );
    function onUserSaveButtonClickHandler(){
        navigate('/map')
    }

    const onCreateInitialUserSaveButtonClickHandler = () => {
        if (userPassword1 !== userPassword2) return -1;
        if (userPassword1 === "") return -2;
        if (userPassword2 === "") return -3;
        if (userName === "") return -4;
        setFormShow(false);
        const xData1 = {
                            results: 
                                        {users:[
                                                {username: "admin", password: "admin"},
                                                {username: userName, password: userPassword1}
                                               ]
                                        }
                            
        };
        const EncryptedData1 = CryptoJS.AES.encrypt(JSON.stringify(xData1), 'garry123').toString();
        const xEncryptedData1 = [{encrypted: EncryptedData1}];
        const element = document.createElement("a");
        const file = new Blob([JSON.stringify(xEncryptedData1)], {
          type: "text/plain"
        });
        element.href = URL.createObjectURL(file);
        element.download = "users.json";
        document.body.appendChild(element);
        element.click();
      };

    const onCreateInitialUserSaveButtonClickHandler1 = () => {
        if (userPassword1 !== userPassword2) return -1;
        if (userPassword1 === "") return -2;
        if (userPassword2 === "") return -3;
        if (userName === "") return -4;
        if (userName === "admin") return -5;
        setFormShow(false);
        const xData1 = {
            results: 
                        {users:[
                                {username: userName, password: userPassword1}
                        ]}
            
        };
        const user =  {username: userName, password: userPassword1};
        userDecryptedData.results.users.push(user);
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
    }

    // run when opened: open users.json file and read its data
    useEffect(() => {
        var userIsLoggedIn =  window.localStorage.getItem("JAED_IS_LOGGED_IN");
        if (userIsLoggedIn==="false") navigate("/login");
        const ip = window.localStorage.getItem("JAED_IP");
        fetch(`${ip}loginlist`) //fetch online data here
        .then((response) => response.json())
        .then((data) => {
            setUserEncryptedData_id(data._id);
            setUserEncryptedData(data.encrypted);
            var bytes = CryptoJS.AES.decrypt(userEncryptedData, 'garry123');
            setUserDecryptedData (JSON.parse(bytes.toString(CryptoJS.enc.Utf8)));
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
                            <strong className="me-auto">CREATE A USER {}user/s</strong>
                            <small className="text-muted">
                                <Badge bg="secondary" onClick></Badge>
                            </small>
                            </Toast.Header>
                        </OverlayTrigger>
                        <Toast.Body>
                            <div className="rounded-md p-2">
                                <FloatingLabel controlId="floatingInput" label="New Email address" className="mb-3">
                                    <Form.Control type="email" placeholder="name@example.com" onChange={(e)=>{setUserName(e.target.value);}}/>
                                </FloatingLabel>
                                <FloatingLabel controlId="floatingPassword" label="New Password">
                                    <Form.Control type="password" placeholder="Password" onChange={(e)=>{setUserPassword1(e.target.value);}}/>
                                </FloatingLabel>
                                <FloatingLabel controlId="floatingPassword" label="Retype New Password">
                                    <Form.Control type="password" placeholder="Password" onChange={(e)=>{setUserPassword2(e.target.value);}}/>
                                </FloatingLabel>
                                <div className='py-2 px-0 rounded-md w-full flex justify-end'>
                                    <OverlayTrigger trigger="hover" placement="right" overlay={tooltip}>
                                        <Button variant='success shadow-lg p-2 ' onClick = {onCreateInitialUserSaveButtonClickHandler}><i class='fas fa-user-shield'></i>&nbsp;&nbsp;Make Initial User</Button> 
                                    </OverlayTrigger>
                                    &nbsp;&nbsp;
                                    <OverlayTrigger trigger="hover" placement="right" overlay={tooltip}>
                                        <Button variant='warning shadow-lg p-2 ' onClick = {onCreateInitialUserSaveButtonClickHandler1}><i class='fas fa-user-shield'></i>&nbsp;&nbsp;Create</Button> 
                                    </OverlayTrigger>
                                </div>
                            </div>
                        </Toast.Body>
                    </Toast>
                    <Toast delay={3000} autohide show={false} bg={"Danger"} key={"Danger"}>
                        <OverlayTrigger trigger="hover" placement="right" overlay={tooltip1}>
                            <Toast.Header>
                            <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                            <strong className="me-auto">UPLOAD USER.JSON</strong>
                            <small className="text-muted">
                                <Badge bg="secondary" onClick></Badge>
                            </small>
                            </Toast.Header>
                        </OverlayTrigger>
                        <Toast.Body>
                            <div className="rounded-md p-2">
                            <div class="flex justify-center">
                                <div class="mb-3 w-96">
                                    <label for="formFileLg" class="form-label inline-block mb-2 text-gray-700">File to upload...</label>
                                    <input class="form-control
                                                    block
                                                    w-full
                                                    px-2
                                                    py-1.5
                                                    text-xl
                                                    font-normal
                                                    text-gray-700
                                                    bg-white bg-clip-padding
                                                    border border-solid border-gray-300
                                                    rounded
                                                    transition
                                                    ease-in-out
                                                    m-0
                                                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" 
                                    id="formFileLg" type="file"/>
                                </div>
                            </div>
                                <div className='py-2 px-0 rounded-md w-full flex justify-end'>
                                    <OverlayTrigger trigger="hover" placement="right" overlay={tooltip}>
                                        <Button variant='warning shadow-lg p-2 ' onClick = {()=>onUserSaveButtonClickHandler()}><i class='fas fa-user-shield'></i>&nbsp;&nbsp;Upload File</Button> 
                                    </OverlayTrigger>
                                </div>
                            </div>
                        </Toast.Body>
                    </Toast>
                </ToastContainer>

                <Modal show={!formShow} onHide={()=>setFormShow(true)} aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Initial User Data processing
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="bg-zinc-100 text-justify">
                        <div className='py-2 px-0 rounded-md w-full flex justify-center'>
                            <h5 className='text-justify'>Plaese wait for the user.json file to download...</h5>
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
        </div>
    </>
)
}

export default CreateUser
