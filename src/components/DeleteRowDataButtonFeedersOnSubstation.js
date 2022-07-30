import React from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const DeleteRowDataButtonFeedersOnSubstation = (props) => {
    const [showConfirmDelete, setShowConfirmDelete] = useState("xxx");
    const handleCloseConfirDeleteModal = () => setShowConfirmDelete("xxx");
    
    function showConfirmDeleteHandler(dataToDelete){
        setShowConfirmDelete(dataToDelete._id);
    }
    function showThisDeleteConfirm(dataToDelete){
        var showme = false;
        if (dataToDelete._id===showConfirmDelete) showme = true;
        return showme; 
    }

    function onDeleteRow (rowToDelete) {
        const newList = props.initList.filter(x => (x._id !== rowToDelete._id));
        props.setInitlist(newList);
        setShowConfirmDelete("xxx");
        const payload = {_id: rowToDelete._id}
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        };
        const ip = window.localStorage.getItem("JAED_IP");
        fetch(`${ip}feedersonSubstations/delete`, requestOptions);
    }
    
  return (
    <>
        <Button variant='danger p-1' onClick={()=>showConfirmDeleteHandler(props.item)}>
            &nbsp;&nbsp;x&nbsp;&nbsp;
        </Button> 
        <Modal show={showThisDeleteConfirm(props.item)} onHide={handleCloseConfirDeleteModal} centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    Confirm Delete item id : {props.item._id}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5>Do you want to proceed deleting item <b>{props.item.name}</b>?</h5>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseConfirDeleteModal}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={()=>onDeleteRow (props.item) }>
                    Proceed
                </Button>
            </Modal.Footer>
        </Modal>    
    </>
  )
}

export default DeleteRowDataButtonFeedersOnSubstation
