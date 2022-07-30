import React from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const DeleteUserRowButton = (props) => {
    const [showConfirmDelete, setShowConfirmDelete] = useState(-1000);
    const handleCloseConfirDeleteModal = () => setShowConfirmDelete(-1);
    
    function showConfirmDeleteHandler(dataToDelete){
        setShowConfirmDelete(dataToDelete.username);
    }
    function showThisDeleteConfirm(dataToDelete){
        var showme = false;
        if (dataToDelete.username===showConfirmDelete) showme = true;
        return showme; 
    }

    function onDeleteRow (rowToDelete) {
        if (rowToDelete.username !== "admin"){
            const newList = props.initlist.filter(x => (x.username !== rowToDelete.username));
            props.setInitlist(newList);
        }
        setShowConfirmDelete(-1);
    }
    
  return (
    <>
        <Button variant='danger p-1' onClick={()=>showConfirmDeleteHandler(props.item)}>
            x
        </Button> 
        <Modal show={showThisDeleteConfirm(props.item)} onHide={handleCloseConfirDeleteModal} centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    Confirm Delete User : {props.item.username}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Do you want to proceed deleting the user?</h4>
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

export default DeleteUserRowButton
