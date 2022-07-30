import React from 'react';
import { useState, useEffect } from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Tooltip from 'react-bootstrap/Tooltip';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import Accordion from 'react-bootstrap/Accordion';
import Spinner from 'react-bootstrap/Spinner';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import DeleteRowButton from './DeleteRowButton';
import EditRowDataButton from './EditRowDataButton';

const TodoList = (props) => {

    const popover = (
        <Popover id="popover-basic">
            <Popover.Header as="h3">
                Popover right
            </Popover.Header>
            <Popover.Body>
                And here's some <strong>amazing</strong> content. It's very engaging,right?
            </Popover.Body>
        </Popover>
    );

    const tooltip = (
        <Tooltip id="tooltip-disabled">Add the above data to the list below</Tooltip>
    );

    const tooltip1 = (
        <Tooltip id="tooltip-disabled">cannot be closed</Tooltip>
    );

    const [toast2Show,setToast2Show] = useState(true);

    const [list1, setList1] = useState([...props.initlist]);
    const [data1,setData1] = useState(1);
    const [data2,setData2] = useState('test list');

    var todo = {
        id : -1,
        data2 : "data2",
        comments : [],
    }

    function onSubmitTodoClickHandler() {
        const newList = [...list1];
        todo.id = data1;
        todo.data2 = data2;
        newList.push(todo);
        setList1(newList);
        setData1(todo.id+1);
        setData2('');
        setToast2Show(true);
    }

    useEffect(() => {
        if (list1.length===0) setToast2Show(false);
    },[list1.length,toast2Show]);

    return (
        <>  
            <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
                <Form.Control type="email" placeholder="name@example.com" />
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label="Password">
                <Form.Control type="password" placeholder="Password" />
            </FloatingLabel>

            <Container fluid = {true}>
                <Row>
                    <Col lg={10} bg="danger">
                        <div className='bg-gray-200'>
                            heheheh
                        </div>
                    </Col>
                    <Col sm={2}>
                        <ProgressBar striped variant="danger" now={60} label={`${60}%`} />;
                    </Col>
                </Row>
                <Row>
                    <Col sm>sm=true</Col>
                    <Col sm>sm=true</Col>
                    <Col sm>sm=true</Col>
                </Row>
            </Container>
            
            <div className='bg-gray-200 p-2'>
                <Spinner animation="border" variant="primary" hidden={toast2Show}/> Loading...
            </div>
            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Accordion Item #1</Accordion.Header>
                    <Accordion.Body>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        aliquip ex ea commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                        culpa qui officia deserunt mollit anim id est laborum.
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Accordion Item #2</Accordion.Header>
                    <Accordion.Body>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        aliquip ex ea commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                        culpa qui officia deserunt mollit anim id est laborum.
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <div className='bg-gray-200 p-2'>
                <ToastContainer>
                    <Toast delay={3000} autohide show={true} bg={"Danger"} key={"Danger"}>
                        <OverlayTrigger trigger="hover" placement="right" overlay={tooltip1}>
                            <Toast.Header>
                            <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                            <strong className="me-auto">Bootstrap</strong>
                            <small className="text-muted">
                                <Badge bg="secondary" onClick = {()=>setToast2Show(true)}>{list1.length}</Badge>
                                &nbsp;record/s
                            </small>
                            </Toast.Header>
                        </OverlayTrigger>
                        <Toast.Body>
                            <div className="rounded-md p-2">
                                <div class="form-group">
                                    <label for="id">List ID:</label>
                                    <input type="number" readonly className="form-control" id="id" value={data1} onChange={(e)=>{setData1(parseInt(e.target.value));}}/>
                                </div>
                                <div class="form-group">
                                    <label for="message">Enter Message:</label>
                                    <input type="text" className="form-control" autofocus value={data2} id="message" onChange={(e)=>{setData2(e.target.value);}}/>
                                </div>
                                <div className='py-2 px-0 rounded-md w-full'>
                                    <OverlayTrigger trigger="hover" placement="right" overlay={tooltip}>
                                        <Button variant='primary shadow-sm p-2' onClick = {()=>onSubmitTodoClickHandler()}>Add</Button> 
                                    </OverlayTrigger>
                                </div>
                            </div>
                        </Toast.Body>
                    </Toast>
                    <Toast show={toast2Show} onClose={()=>setToast2Show(false)}>
                        <Toast.Header>
                        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                        <strong className="me-auto">Bootstrap</strong>
                        <small className="text-muted">2 seconds ago</small>
                        </Toast.Header>
                        <Toast.Body>
                            {list1.map(x => 
                                <div className="bg-gray-50 p-2">
                                    <DeleteRowButton setInitlist={setList1} initlist={list1} item = {x} />
                                    <EditRowDataButton setInitlist={setList1} initlist={list1} item = {x}/>
                                    &nbsp;id:&nbsp;{x.id}&nbsp;&nbsp;Data:&nbsp;{x.data2}&nbsp;&nbsp;&nbsp;Date:&nbsp;{x.data3}
                                    <div className="bg-gray-50 shadow-sm rounded-md p-2">
                                        {x.comments.map(y =>
                                            <div className="bg-gray-200 shadow-sm rounded-md p-2">
                                                {y.id} {y.message}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </Toast.Body>
                    </Toast>
                </ToastContainer>
            </div>
        </>
    )
}

export default TodoList
