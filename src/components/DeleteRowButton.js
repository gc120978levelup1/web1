import React from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const DeleteRowButton = (props) => {
    const [showConfirmDelete, setShowConfirmDelete] = useState(-1000);
    const handleCloseConfirDeleteModal = () => setShowConfirmDelete(-1);
    
    function showConfirmDeleteHandler(dataToDelete){
        setShowConfirmDelete(dataToDelete.id);
    }
    function showThisDeleteConfirm(dataToDelete){
        var showme = false;
        if (dataToDelete.id===showConfirmDelete) showme = true;
        return showme; 
    }

    function onDeleteRow (rowToDelete) {
        const newList = props.initlist.filter(todo => (todo.id !== rowToDelete.id));
        props.setInitlist(newList);
        setShowConfirmDelete(-1);
    }
    
  return (
    <>
        <Button variant='danger p-1' onClick={()=>showConfirmDeleteHandler(props.item)}>
            x
        </Button> 
        <Modal show={showThisDeleteConfirm(props.item)} onHide={handleCloseConfirDeleteModal}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Confirm Delete Row #{props.item.id}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Do you want to proceed deleting data?</h4>
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

export default DeleteRowButton
