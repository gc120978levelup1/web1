import React from 'react';
import { useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
var CryptoJS = require("crypto-js");

const EditRowDataButtonFeeder = (props) => {
    const navigate = useNavigate();
    const [addTownFormShow, setAddTownFormShow] = useState(false);
    const [addTownFormShowName, setAddTownFormShowName] = useState(props.item.name);
    const [addTownFormShowAddress, setAddTownFormShowAddress] = useState(props.item.address);
    const [addTownFormShowGeoJSONID, setAddTownFormShowGeoJSONID] = useState(props.item.geojson_id);
    const [editTownFormShowName, setEditTownFormShowName] = useState(props.item.name);
    const [editTownFormShowWeb, setEditTownFormShowWeb] = useState(props.item.website);
    const [show1, setShow] = useState("xx");
    const handleClose = () => setShow("xx");
    const [addGeoJSONFormShow,setAddGeoJSONFormShow] = useState(false);
    const [message, setmessage] = useState("");
    const [xDTFilename, setxDTFilename] = useState("");
    const [xPoleFilename, setxPoleFilename] = useState("");
    const [xCustFilename, setxCustFilename] = useState("");
    const [xPLineFilename, setxPLineFilename] = useState("");

useEffect(() => {
    var userIsLoggedIn =  window.localStorage.getItem("JAED_IS_LOGGED_IN");
    if (userIsLoggedIn!=="true") navigate("/login");
    const ip = window.localStorage.getItem("JAED_IP");
    console.log(`${ip}geojsons/${props.item.geojson_id}`);
    fetch(`${ip}geojsons/${props.item.geojson_id}`) //fetch online data here
    .then((response) => response.json())
    .then((data) => {
        setxDTFilename(data.DTDataFilename);
        console.log(data.DTDataFilename);
        setxPoleFilename(data.PoleDataFilename);
        console.log(data.PoleDataFilename);
        setxCustFilename(data.CustDataFilename);
        console.log(data.CustDataFilename);
        setxPLineFilename(data.PLineDataFilename);
        console.log(data.PLineDataFilename);
    });
  },[]);

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
        const payload = [{_id: data._id},{name: editTownFormShowName,address: editTownFormShowWeb}];
        const requestOptions = {
            crossDomain:true,
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        };
        const ip = window.localStorage.getItem("JAED_IP");
        fetch(`${ip}feeders/update`, requestOptions);
    }

    function onAddGeoJSONFiles(){
        setAddGeoJSONFormShow(true);
        var data_id = "";
        var xupdate = "update"; 
        var data = [{_id: addTownFormShowGeoJSONID},{DTData : "",PoleData : "",CustData : "",PLineData : ""}];
        if (addTownFormShowGeoJSONID==="") {
            xupdate = "create";
            data = {DTData : "",PoleData : "",CustData : "",PLineData : ""};
        } 
        const requestOptions = {
            crossDomain:true,
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
        const ip = window.localStorage.getItem("JAED_IP");
        if (xupdate === "create"){
            fetch(`${ip}geojsons/${xupdate}`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                setAddTownFormShowGeoJSONID(data._id);
                setmessage(data._id);
        })}
    }

    function onClickSaveAddFeeder(item){ //{name,address,geojson_id}
        const payload = [{_id: item._id},{name: addTownFormShowName, address: addTownFormShowAddress, geojson_id:addTownFormShowGeoJSONID}];
        const requestOptions = {
            crossDomain:true,
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        };
        const ip = window.localStorage.getItem("JAED_IP");
        fetch(`${ip}feeders/update`, requestOptions);
        setShow(false);
    };

    async function onsetGeoJSONPolesFile(file){
        setxPoleFilename(".... uploading file");
        const ip = window.localStorage.getItem("JAED_IP");
        var reader = new FileReader();
        reader.readAsText(file);
        reader.onload = async function() {
            const x = (CryptoJS.AES.encrypt(reader.result, 'garry123').toString());
            var data = {DataFile : x};
            var requestOptions = {
                crossDomain:true,
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            };
            const upload_response = await fetch(`${ip}geojsonfiles/create`, requestOptions).then((response) => response.json());
            
            data = [{_id: addTownFormShowGeoJSONID},{PoleDataFilename : file.name, PoleData:upload_response._id}];
            requestOptions = {
                crossDomain:true,
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            };
            const geojsons_response = await fetch(`${ip}geojsons/update/PoleData`, requestOptions).then((response) => response.json());
            setxPoleFilename(file.name);
        };
    }

    
    async function onsetGeoJSONDTsFile(file){
        setxDTFilename(".... uploading file");
        const ip = window.localStorage.getItem("JAED_IP");
        var reader = new FileReader();
        reader.readAsText(file);
        reader.onload = async function() {
            const x = (CryptoJS.AES.encrypt(reader.result, 'garry123').toString());
            var data = {DataFile : x};
            var requestOptions = {
                crossDomain:true,
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            };
            const upload_response = await fetch(`${ip}geojsonfiles/create`, requestOptions).then((response) => response.json());
            
            data = [{_id: addTownFormShowGeoJSONID},{DTDataFilename : file.name, DTData:upload_response._id}];
            requestOptions = {
                crossDomain:true,
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            };
            const geojsons_response = await fetch(`${ip}geojsons/update/DTData`, requestOptions).then((response) => response.json());
            setxDTFilename(file.name);
        };
    }

    async function saveCustAndGeoJsonData(textDataFromFileReader,xaddTownFormShowGeoJSONID,xfile){
        const ip = window.localStorage.getItem("JAED_IP");
        const test1 = JSON.parse(textDataFromFileReader);
        const custdata = test1.features;
        console.log(custdata.length);
        //for (let i=0;i < cust_data.length; i++){
            //let cust = cust_data[i];
            if (custdata!==null){//cid,name,address,custtype,lat,lon,geojson_id
                console.log([{geojson_id: xaddTownFormShowGeoJSONID}, {custdata} ]);
                const data = [{geojson_id: xaddTownFormShowGeoJSONID}, {custdata} ];
                const requestOptions = {
                    crossDomain:true,
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                };
                const try1 = await fetch(`${ip}custsongeojsons/update`, requestOptions).then((response) => response.json());
                //console.log(`.... uploading file ${i} / ${cust_data.length}`);
               // setxCustFilename(`.... uploading file ${i} / ${cust_data.length}`);
            }
        //};
        setxCustFilename(xfile.name);
    }

    async function onsetGeoJSONCustsFile(file){
        setxCustFilename(".... uploading file");
        const ip = window.localStorage.getItem("JAED_IP");
        var reader = new FileReader();
        reader.readAsText(file);
        reader.onload = async function() {
            const x = (CryptoJS.AES.encrypt(reader.result, 'garry123').toString());
            var data = {DataFile : x};
            var requestOptions = {
                crossDomain:true,
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            };
            const upload_response = await fetch(`${ip}geojsonfiles/create`, requestOptions).then((response) => response.json());
            
            data = [{_id: addTownFormShowGeoJSONID},{CustDataFilename : file.name, CustData:upload_response._id}];
            requestOptions = {
                crossDomain:true,
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            };
            const geojsons_response = await fetch(`${ip}geojsons/update/CustData`, requestOptions).then((response) => response.json());
            const a = reader.result.toString();
            setxCustFilename(".... customer data");
            saveCustAndGeoJsonData(a,addTownFormShowGeoJSONID,file);
        };
    }

    function onsetGeoJSONPLinesFile(file){
        setxPLineFilename(".... uploading file");
        const ip = window.localStorage.getItem("JAED_IP");
        var reader = new FileReader();
        reader.readAsText(file);
        reader.onload = async function() {
            const x = (CryptoJS.AES.encrypt(reader.result, 'garry123').toString());
            var data = {DataFile : x};
            var requestOptions = {
                crossDomain:true,
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            };
            const upload_response = await fetch(`${ip}geojsonfiles/create`, requestOptions).then((response) => response.json());
            
            data = [{_id: addTownFormShowGeoJSONID},{PLineDataFilename : file.name, PLineData:upload_response._id}];
            requestOptions = {
                crossDomain:true,
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            };
            const geojsons_response = await fetch(`${ip}geojsons/update/PLineData`, requestOptions).then((response) => response.json());
            setxPLineFilename(file.name);
        };
    }

    function  onClickSaveGeoJSONFiles(){ //{DTData,PoleData,CustData,PLineData}
    }

  return (
    <>
        <Button variant="success p-1" onClick={()=>EditOnClickHandler(props.item)}>
            Edit
        </Button>
        <Modal contentClassName="modal modal-sm modal-width" show={showThisForm(props.item)} onHide={()=>setShow(false)} aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Edit Feeder
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="bg-zinc-100 text-justify">
                        <FloatingLabel controlId="floatingInput" label="Feeder Name" className="mb-3">
                            <Form.Control type="text" placeholder="name@example.com" value={addTownFormShowName} onChange={(e)=>{setAddTownFormShowName(e.target.value);}}/>
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingInput" label="Feeder Scope Address" className="mb-3">
                            <Form.Control type="text" className="p-10" value={addTownFormShowAddress} placeholder="name@example.com" onChange={(e)=>{setAddTownFormShowAddress(e.target.value);}}/>
                        </FloatingLabel>
                        <Form.Label >GeoJSON ID:  </Form.Label>
                        <b>{addTownFormShowGeoJSONID}</b>
                        <br/>
                        <div className="col-md-12 text-center">
                            <Button variant="primary p-2" onClick={()=>{onAddGeoJSONFiles()}}>
                                <i class="fa fa-close"></i>&nbsp;&nbsp;Edit GeoJSON Files
                            </Button>
                            <div className="bg-gray-50 p-2 m-2 shadow-lg rounded-lg border-2 border-blue-600">
                                <b>Poles Data: </b>{xPoleFilename}
                            </div>
                            <div className="bg-gray-50 p-2 m-2 shadow-lg rounded-lg border-2 border-blue-600">
                                <b>DTs Data: </b>{xDTFilename}
                            </div>
                            <div className="bg-gray-50 p-2 m-2 shadow-lg rounded-lg border-2 border-blue-600">
                                <b>Customers Data: </b>{xCustFilename}
                            </div>
                            <div className="bg-gray-50 p-2 m-2 shadow-lg rounded-lg border-2 border-blue-600">
                                <b>Primary Line Data: </b>{xPLineFilename}
                            </div>
                        </div>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="warning p-2" onClick={()=>onClickSaveAddFeeder(props.item)}>
                            &nbsp;<i class="fas fa-database"></i>&nbsp;&nbsp;SAVE
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal contentClassName="modal modal-lg modal-width" show={addGeoJSONFormShow} onHide={()=>setAddGeoJSONFormShow(false)} aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Edit GeoJSON Data
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="bg-zinc-100 text-justify">
                        <Form.Label className="mb-0">Primary Poles File</Form.Label><br/>
                        <input 
                            className="w-full max-w-lg rounded-full border-2 border-red-300 file:ring-blue-500/70 h-13 file:active:ring-4 p-2 text-sm text-grey-500
                            file:-mt-0 file:ml-0 file:mr-5 file:py-1 file:px-2
                            file:rounded-full file:border-1 file:border-blue-200
                            file:text-sm file:font-semibold  file:text-white
                            file:bg-gradient-to-r file:from-blue-600 file:to-purple-600
                            hover:file:cursor-pointer hover:file:opacity-80" 
                                type="file" placeholder="name@example.com" onChange={(e)=>{onsetGeoJSONPolesFile(e.target.files[0]);}}/>
                        <p>{xPoleFilename}</p>
                        <br/>
                        
                        <Form.Label className="mb-0">DTs File</Form.Label> <br/>
                        <input 
                            className="w-full max-w-lg rounded-full border-2 border-red-300 file:ring-blue-500/70 h-13 file:active:ring-4 p-2 text-sm text-grey-500
                            file:-mt-0 file:ml-0 file:mr-5 file:py-1 file:px-2
                            file:rounded-full file:border-1 file:border-blue-200
                            file:text-sm file:font-semibold  file:text-white
                            file:bg-gradient-to-r file:from-blue-600 file:to-purple-600
                            hover:file:cursor-pointer hover:file:opacity-80" 
                                type="file" placeholder="name@example.com" onChange={(e)=>{onsetGeoJSONDTsFile(e.target.files[0]);}}/>
                        <p>{xDTFilename}</p>
                        <br/>
                        <Form.Label className="mb-0">Customers File</Form.Label> <br/>
                        <input 
                            className="w-full max-w-lg rounded-full border-2 border-red-300 file:ring-blue-500/70 h-13 file:active:ring-4 p-2 text-sm text-grey-500
                            file:-mt-0 file:ml-0 file:mr-5 file:py-1 file:px-2
                            file:rounded-full file:border-1 file:border-blue-200
                            file:text-sm file:font-semibold  file:text-white
                            file:bg-gradient-to-r file:from-blue-600 file:to-purple-600
                            hover:file:cursor-pointer hover:file:opacity-80" 
                                type="file" placeholder="name@example.com" onChange={(e)=>{onsetGeoJSONCustsFile(e.target.files[0]);}}/>
                        <p>{xCustFilename}</p>
                        <br/>
                        <Form.Label className="mb-0">Primary Lines File</Form.Label> <br/>
                        <input 
                            className="w-full max-w-lg rounded-full border-2 border-red-300 file:ring-blue-500/70 h-13 file:active:ring-4 p-2 text-sm text-grey-500
                            file:-mt-0 file:ml-0 file:mr-5 file:py-1 file:px-2
                            file:rounded-full file:border-1 file:border-blue-200
                            file:text-sm file:font-semibold  file:text-white
                            file:bg-gradient-to-r file:from-blue-600 file:to-purple-600
                            hover:file:cursor-pointer hover:file:opacity-80" 
                                type="file" placeholder="name@example.com" onChange={(e)=>{onsetGeoJSONPLinesFile(e.target.files[0]);}}/>
                         <p>{xPLineFilename}</p>
                         <br/>
                         {message}                        
                    </Modal.Body>

                </Modal>
    </>
  )
}

export default EditRowDataButtonFeeder
