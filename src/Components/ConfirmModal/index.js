import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ConfirmModal({ 
    RenderComponent, 
    modalTitle, 
    modalText, 
    actionText, 
    actionMethod
 }) {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        {RenderComponent ?
        <span  onClick={handleShow}>
            { RenderComponent}
        </span>
       
        :
        <Button variant="primary" onClick={handleShow}>
          Launch demo modal
        </Button>
        }
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{ modalTitle? modalTitle : ''}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{modalText ? modalText : ''}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={actionMethod}>
             {actionText}
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  
export default ConfirmModal;