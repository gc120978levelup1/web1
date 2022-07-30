import React from 'react';
import { useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const EditRowDataButton = (props) => {
    const [editdata2,setEditData2] = useState('');
    const [show1, setShow] = useState(-1000);
    const handleClose = () => setShow(-1);

    function EditOnClickHandler(dataToShow){
        setShow(dataToShow.id);
        //setEditData1(dataToShow.id);
        setEditData2(dataToShow.data2);
    }

    function showThisForm(dataToShow){
        var showme = false;
        if (dataToShow.id===show1) showme = true;
        return showme; 
    }

    function onSubmitEditTodoClickHandler(data) {
        const newList = [...props.initlist];
        newList.forEach(
            todo => {
                if (todo._id=== data._id){
                    todo.data2 = editdata2;
                }
            }
        );
        props.setInitlist(newList);
        setShow(-1);
    }

  return (
    <>
        <Button variant="success p-1" onClick={()=>EditOnClickHandler(props.item)}>
            Edit
        </Button>
        <Modal show={showThisForm(props.item)} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Edit row #{props.item._id}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div className="form-group">
                <label>List ID:</label>
                <input type="number" className="form-control" readonly value={props.item.id} />
                <label>Enter Message:</label>
                <input type="text" className="form-control" autofocus value={editdata2} onChange={(e)=>{setEditData2(e.target.value);}}/>
            </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={()=>onSubmitEditTodoClickHandler(props.item)}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal> 
    </>
  )
}

export default EditRowDataButton
