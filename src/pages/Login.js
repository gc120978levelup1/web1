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

const Login = (props) => {
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
        <Tooltip id="tooltip-disabled">Enter proper email and password and click me.</Tooltip>
    );
    const tooltip1 = (
        <Tooltip id="tooltip-disabled">cannot be closed!</Tooltip>
    );

    function onLoginButtonClickHandler(){
        //navigate("/");
        var oneFound = false;
        userDecryptedData.results.users.forEach(user =>{
            setFormShow(false);
            if ((user.username === userName )&&(user.password == userPassword1)){ 
                window.localStorage.setItem("JAED_IS_LOGGED_IN","true");
                window.localStorage.setItem("JAED_USERNAME_IN",userName);
                props.setUserName(userName);
                navigate("/map");
            }
            setFormShow(false);
        });
    }
    
        // run when opened: open users.json file and read its data
        useEffect(() => {
            const ip = window.localStorage.getItem("JAED_IP");
            var userIsLoggedIn =  window.localStorage.getItem("JAED_IS_LOGGED_IN");
            if (userIsLoggedIn==="true") navigate("/map");
            //fetch('data/users.json') //fetch offline data here
            console.log(`${ip}loginlist`);
            fetch(`${ip}loginlist`) //fetch online data here
            .then((response) => response.json())
            .then((data) => {
                setUserEncryptedData(data.encrypted);
                var bytes = CryptoJS.AES.decrypt(userEncryptedData, 'garry123');
                setUserDecryptedData (JSON.parse(bytes.toString(CryptoJS.enc.Utf8)));
            });
        });

  return (
    <>
    <div className="ex1 bg-cover bg-center loginCenterbg backdrop-blur-sm bg-white"></div>
    <div className="loginCenter bg-zinc-300 rounder-md">

                <Modal show={!formShow} onHide={()=>setFormShow(true)} aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Login Progress
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="bg-zinc-100 text-justify">
                        <div className='py-2 px-0 rounded-md w-full flex justify-center'>
                            <h5 className='text-justify'>Login Credential is invalid please login again... <Spinner animation="border" variant="primary" hidden={false}/></h5>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="warning shadow-lg p-2" onClick={()=>setFormShow(true)}>
                            <i class="fa fa-close"></i>&nbsp;&nbsp;OK
                        </Button>
                    </Modal.Footer>
                </Modal>
        </div>

        <div class="loginCenter flex items-center justify-center" >
        <div class="w-full max-w-xs bg-white shadow-lg rounded-lg px-8 pt-6 pb-2 m-2 mb-2 border-2 border-gray-600">
            <div >
                <div class="mb-2">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                        Username
                    </label>
                    <input class="focus:scale-110 focus:border-blue-800 focus:border-4 border-1 border-blue-500  shadow-lg  rounded-full w-full py-2 px-3 text-gray-700 mb-3 " type="text" placeholder="Username" onChange={(e)=>{setUserName(e.target.value);}}/>
                </div>
                <div class="mb-2">
                    <label class="block text-gray-600 text-sm font-bold mb-2" for="password">
                        Password
                    </label>
                    <input class="focus:scale-110 focus:border-blue-800 focus:border-4 border-1 border-blue-500  shadow-lg  rounded-full w-full py-2 px-3 text-gray-700 mb-3 " type="password" placeholder="******************" onChange={(e)=>{setUserPassword1(e.target.value);}}/>
                    <p class="text-red-500 text-xs italic">Please choose a password.</p>
                </div>
                <div class="flex items-center justify-between">
                <button
                    onClick = {()=>onLoginButtonClickHandler()}
                    className={`hover:scale-110 cursor-pointer h-8 bg-red-500 ring-red-500/70 focus:ring-4 hover:bg-red-600 text-white font-bold  m-2 px-4 border-b-4 border-red-700 hover:border-red-800 rounded-full`}> 
                    Sign In
                </button>
                <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="">
                    Forgot Password?
                </a>
                </div>
            </div>
            <br/>
            <p class="text-center text-gray-500 text-xs">
                &copy;2022 JAED Technologies Cebu Co. All rights reserved.
            </p>
        </div>
    </div>


    </>
)
}

export default Login
