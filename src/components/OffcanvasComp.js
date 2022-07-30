import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useNavigate } from "react-router-dom";

function OffcanvasComp(props) {
    const navigate = useNavigate(); 
    const [userName,setUserName] = useState("");
    
    const [searchValue, setSearchValue] = useState('');
    async function onSearchButtonClickHandler(){
        navigate(`/`);
        const ip = window.localStorage.getItem("JAED_IP");
        const results = await fetch(`${ip}custsongeojsons/ofcid/${searchValue}`).then((response) => response.json());
        window.localStorage.setItem("JAED_CUSTOMER_ID",results[0].cid);
        navigate(`/CoolMap/${results[0].geojson_id}/searchcid/${results[0].cid}`);
    }


useEffect(() => {
    var userIsLoggedIn =  window.localStorage.getItem("JAED_IS_LOGGED_IN");
    if (userIsLoggedIn!=="true") setUserName("");
  });

  return (
    <>
      {['false'].map((expand) => (
        <Navbar key={expand} fixed="top" bg="light" expand={expand} className="mb-3" show={false}>
            <Container fluid align="left">
                <div>
                    <div class="flex items-center ">
                        <div class="w-screen flex items-center h-10 text-white">
                            &nbsp;&nbsp;
                            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                            &nbsp;&nbsp;
                            <div className='image-container faded faded-wide faded-right'></div>
                            <div className="flex flex-col -m-20">
                                <br/>
                                <span className="text-md font-semibold text-purple-400">User:</span>
                                <p className="text-1xl  font-semibold uppercase"> /{props.userName}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <Navbar.Offcanvas
                    id={`offcanvasNavbar-expand-false`}
                    aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                    placement="start">
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                            JAED.Web Main Menu
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="justify-content-end flex-grow-1 pe-3">
                                <Nav.Link href="/">Public</Nav.Link>
                          {(window.localStorage.getItem("JAED_IS_LOGGED_IN") !== "true") ? (
                            <>
                                <Nav.Link href="/login">Login</Nav.Link>
                            </>
                            ):(
                            <>
                                <Nav.Link href="/home">Home</Nav.Link>
                                <Nav.Link href="/portal">Portal</Nav.Link>
                                <NavDropdown
                                    title="Map"
                                    id={`offcanvasNavbarDropdown-expand-${expand}`}>
                                    <NavDropdown.Item href="/MapPerTown">
                                        Per Towns
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="/MapPerSubstation">
                                        Per Substations
                                    </NavDropdown.Item>
                                </NavDropdown>
                                <NavDropdown
                                    title="Organize Data"
                                    id={`offcanvasNavbarDropdown-expand-${expand}`}>
                                    <NavDropdown.Item href="/Towns">
                                        Towns
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="/Substations">
                                        Substations
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="/Feeders">
                                        Feeders
                                    </NavDropdown.Item>
                                </NavDropdown>
                                <NavDropdown
                                    title="User Action"
                                    id={`offcanvasNavbarDropdown-expand-${expand}`}>
                                    <NavDropdown.Item href="/createuser">
                                        Add A User
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="/deleteuser">
                                        Delete A User
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="/logout">
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </>)}
                        </Nav>
                        {(props.userName !== "") ? (<>
                            &nbsp;
                            <Form className="d-flex">
                                <Form.Control
                                    onChange={(e)=>{setSearchValue(e.target.value);}}
                                    type="search"
                                    placeholder="Search"
                                    className="me-2"
                                    aria-label="Search"/>
                                <Button 
                                   onClick={()=>onSearchButtonClickHandler()}
                                   variant="outline-success">Search</Button>
                            </Form>
                        </>):(<></>)}
                    </Offcanvas.Body>
                </Navbar.Offcanvas>

            </Container>
        </Navbar>
      ))}
    </>
  );
}

export default OffcanvasComp;

