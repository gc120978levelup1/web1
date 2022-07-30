import {React,useState,useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import EditRowDataButtonFeeder from '../components/EditRowDataButtonFeeder';
import DeleteRowButtonFeeder from '../components/DeleteRowButtonFeeder';
import { useNavigate } from "react-router-dom";
var CryptoJS = require("crypto-js");

const Feeders = (props) => {
    const [xlist, setList] = useState([]);
    const [addTownFormShow, setAddTownFormShow] = useState(false);
    const [addTownFormShowName, setAddTownFormShowName] = useState("");
    const [addTownFormShowAddress, setAddTownFormShowAddress] = useState("");
    const [addTownFormShowGeoJSONID, setAddTownFormShowGeoJSONID] = useState("");
    const [listTownFormShow, setListTownFormShow] = useState(false);
    const [addGeoJSONFormShow,setAddGeoJSONFormShow] = useState(false);
    //const [geoJSONPolesFile,setGeoJSONPolesFile] = useState(null);
    //const [geoJSONDTsFile,setGeoJSONDTsFile] = useState(null);
    //const [geoJSONCustomersFile,setGeoJSONCustomersFile] = useState(null);
    //const [geoJSONPriLinesFile,setGeoJSONPriLinesFile] = useState(null);
    const [xDTFilename, setxDTFilename] = useState("");
    const [xPoleFilename, setxPoleFilename] = useState("");
    const [xCustFilename, setxCustFilename] = useState("");
    const [xPLineFilename, setxPLineFilename] = useState("");
    const [message, setmessage] = useState("");
    const nonStatData_id = "";
    const navigate = useNavigate()    
    
    useEffect(() => {
        var userIsLoggedIn =  window.localStorage.getItem("JAED_IS_LOGGED_IN");
        if (userIsLoggedIn==="false") navigate("/login");
        const ip = window.localStorage.getItem("JAED_IP");
        fetch(`${ip}feeders`) 
        .then((response) => response.json())
        .then((data) => {
            setList(data);
        });
    });

    function onClickSaveAddFeeder(){ //{name,address,geojson_id}
        const payload = {name: addTownFormShowName, address: addTownFormShowAddress, geojson_id:addTownFormShowGeoJSONID};
        const requestOptions = {
            crossDomain:true,
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        };
        const ip = window.localStorage.getItem("JAED_IP");
        fetch(`${ip}feeders/create`, requestOptions);
        setAddTownFormShow(false);
    };

    function  onClickSaveGeoJSONFiles(){ //{DTData,PoleData,CustData,PLineData}
    }

    function onAddGeoJSONFiles(){
        setAddGeoJSONFormShow(true);
        var xupdate = "update"; 
        var data = [{_id: addTownFormShowGeoJSONID},{DTData : "",PoleData : "",CustData : "",PLineData : ""}];
        if (addTownFormShowGeoJSONID==="") {
            xupdate = "create";
            data = {DTDataFilename : "",PoleDataFilename : "",CustDataFilename : "",PLineDataFilename : "",DTData : "",PoleData : "",CustData : "",PLineData : ""};
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
                nonStatData_id = data._id;
        })}
    }

    async function onsetGeoJSONPolesFile(file){
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
        const ip = window.localStorage.getItem("JAED_IP");
        var reader = new FileReader();
        reader.readAsText(file);
        reader.onload = async function() {
            const x = (CryptoJS.AES.encrypt(reader.result, 'garry123').toString());
            var data = {DataFile : x};
            var requestOptions = {
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

    async function saveCustAndGeoJsonData(textDataFromFileReader,xaddTownFormShowGeoJSONID){
        const ip = window.localStorage.getItem("JAED_IP");
        const test1 = JSON.parse(textDataFromFileReader);
        const cust_data = test1.features;
        console.log(cust_data.length);
        setxCustFilename("....downloading");
        for (let i=0;i < cust_data.length; i++){
            let cust = cust_data[i];
            if (cust.properties.CustomerID!==null){//cid,name,address,custtype,lat,lon,geojson_id
                const data = [{cid: cust.properties.CustomerID},{ 
                                                                   name: cust.properties.CustomerName, 
                                                                address: cust.properties.Address,
                                                               custtype: cust.properties.CustomerType,
                                                                    lat: cust.geometry.coordinates[1],
                                                                    lon: cust.geometry.coordinates[0],  
                                                             geojson_id: xaddTownFormShowGeoJSONID}];
                const requestOptions = {
                    crossDomain:true,
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                };
                const try1 = await fetch(`${ip}custsongeojsons/update`, requestOptions).then((response) => response.json());
            }
        };
    }

    async function onsetGeoJSONCustsFile(file){
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
            saveCustAndGeoJsonData(a,addTownFormShowGeoJSONID);
            setxCustFilename(file.name);
        };
    }

    async function onsetGeoJSONPLinesFile(file){
        const ip = window.localStorage.getItem("JAED_IP");
        var reader = new FileReader();
        reader.readAsText(file);
        reader.onload = async function() {
            const a = reader.result.toString();
            saveCustAndGeoJsonData(a,addTownFormShowGeoJSONID);
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


    function onClickSaveListTown(){ //{name,website}
    };

  return (
    <>
      <div className="ex1 bg-cover bg-center feederCenterbg backdrop-blur-sm bg-white/30"></div>
      <Button className="loginCenter" variant="primary" onClick={()=>{setAddTownFormShow(true);setAddTownFormShowGeoJSONID("");}}>Add Feeder</Button>
      <Button className="loginCenter1" variant="secondary" onClick={()=>setListTownFormShow(true)}>Feeder List</Button>
      <Modal contentClassName="modal modal-sm modal-width" show={addTownFormShow} onHide={()=>setAddTownFormShow(false)} aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Add Feeder
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="bg-zinc-100 text-justify">
                        <FloatingLabel controlId="floatingInput" label="Feeder Name" className="mb-3">
                            <Form.Control type="text" placeholder="name@example.com" onChange={(e)=>{setAddTownFormShowName(e.target.value);}}/>
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingInput" label="Feeder Scope Address" className="mb-3">
                            <Form.Control type="text" className="p-10" placeholder="name@example.com" onChange={(e)=>{setAddTownFormShowAddress(e.target.value);}}/>
                        </FloatingLabel>
                        <Form.Label >GeoJSON ID:  </Form.Label>
                        <b>{addTownFormShowGeoJSONID}</b>
                        <br/>
                        <div className="col-md-12 text-center">
                            <Button variant="primary p-2" onClick={()=>{onAddGeoJSONFiles()}}>
                                <i class="fa fa-close"></i>&nbsp;&nbsp;Add GeoJSON Files
                            </Button>
                        </div>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="warning p-2" onClick={()=>onClickSaveAddFeeder()}>
                            <i class="fa fa-close"></i>&nbsp;&nbsp;SAVE
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal contentClassName="modal modal-lg modal-width" show={addGeoJSONFormShow} onHide={()=>setAddGeoJSONFormShow(false)} aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Add GeoJSON Data
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
                        <br/><br/>
                        
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
                        <br/><br/>
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
                        <br/><br/>
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
                         <br/><br/>
                         {message}
                    </Modal.Body>
                </Modal>

                <Modal contentClassName="modal modal-sm modal-width" show={listTownFormShow} onHide={()=>setListTownFormShow(false)} aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Edit Feeders
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="bg-zinc-100 text-justify">
                    {xlist.map(x => 
                                        <div className="bg-gray-50 p-2 m-2 shadow-lg rounded-lg border-2 border-blue-600">
                                            :::&nbsp;
                                            <b>{x.name}</b> {x.website} <br/>
                                            <EditRowDataButtonFeeder item = {x} setInitlist = {setList} initList = {xlist} />
                                            &nbsp;
                                            <DeleteRowButtonFeeder item = {x} setInitlist = {setList} initList = {xlist} />
                                        </div>
                                )}
                    </Modal.Body>
                </Modal>
    </>
  )
}

export default Feeders
