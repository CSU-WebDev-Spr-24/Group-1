import React from 'react';
import { Offcanvas } from 'react-bootstrap';
import { Eye } from 'heroicons-react';

const OffCanvas = ({ show, handleClose, entry }) => {
    return (
        <Offcanvas show={show} onHide={handleClose}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Entry Details</Offcanvas.Title> 
            </Offcanvas.Header>
            <Offcanvas.Body>
                <div className="flex items-center mb-4">
                    <Eye size={24}/>
                    <p className="mb-0">Welcome to your journal entry details!</p>
                </div>
                <p>Date: {entry.date}</p>
                <p>Location: {entry.location}</p>
                <p>Description: {entry.text}</p>
                {/* Add more details as needed */}
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default OffCanvas;
