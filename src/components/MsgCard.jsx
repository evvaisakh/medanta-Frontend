import React from 'react'
import { Button, Card } from 'react-bootstrap'

function MsgCard({ displayData }) {
    
    return (
        <>
            <Card border="info" style={{ width: '18rem', borderRadius: '15px 50px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' }}>
                <Card.Header>From : {displayData?.name}</Card.Header>
                <Card.Body>
                    <Card.Subtitle className="mb-3 text-lowercase">{displayData?.email}</Card.Subtitle>
                    <Card.Subtitle className="mb-2 text-muted text-capitalize">Subject : {displayData?.subject}</Card.Subtitle>
                    <Card.Text>{displayData?.message}</Card.Text>
                </Card.Body>
                <Button variant="link ms-auto"><i className="fa-solid fa-trash-can text-danger"></i></Button>
            </Card>
        </>
    )
}

export default MsgCard