import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap'
import { SERVER_URL } from '../services/serverUrl'
import EditDoctor from './EditDoctor'
import { removeDoctorAPI } from '../services/allAPI'
import { addResponseContext } from '../context/ContextAPI'

function DoctorCard({ displayData }) {
    const { addResponse, setAddResponse } = useContext(addResponseContext)
    const [adminLog, setAdminLog] = useState(false)

    useEffect(() => {
        try {
            if (sessionStorage.getItem("existingUser")) {
                const { isAdmin } = JSON.parse(sessionStorage.getItem("existingUser"))
                setAdminLog(isAdmin)
            } else {
                setAdminLog(false)
            }
        } catch (error) {
            console.error('Error accessing sessionStorage:', error);
        }
    }, [addResponse])

    const handleDeleteDoctor = async (doctorId) => {
        const token = sessionStorage.getItem("token")
        if (token) {
            const reqHeader = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
            // api call
            const result = await removeDoctorAPI(doctorId, reqHeader)
            if (result.status == 200) {
                setAddResponse(result)
            } else {
                console.log(result);
            }
        }
    }

    return (
        <>
            <Row>
                <Col className='mb-3' sm={12} md={6} lg={4}>
                    <Card style={{ width: '20rem' }} className='shadow mt-5 rounded'>
                        {adminLog ?
                            <div className='p-2'>
                                < Card.Img height={'200px'} variant="top" src={`${SERVER_URL}/uploads/${displayData?.docImage}`} alt={displayData.docName} />
                                <Card.Body>
                                    <Card.Title className='text-center'>{displayData.docName}</Card.Title>
                                </Card.Body>
                                <ListGroup className="list-group-flush fw-bold">
                                    <ListGroup.Item>Department : {displayData.docDepartment}</ListGroup.Item>
                                    <ListGroup.Item>Qualification : {displayData.docQualification}</ListGroup.Item>
                                    <ListGroup.Item>E-mail : {displayData.docEmail}</ListGroup.Item>
                                    <ListGroup.Item>Phone : {displayData.docPhone}</ListGroup.Item>
                                </ListGroup>
                                <Card.Body className='d-flex justify-content-around'>
                                    <div><EditDoctor displayData={displayData} /></div>
                                    <Button onClick={() => handleDeleteDoctor(displayData?._id)} variant="link"><i className="fa-solid fa-trash-can text-danger"></i></Button>
                                </Card.Body>
                            </div>
                            :
                            <div className='p-2'>
                                <Card.Img height={'200px'} variant="top" src={`${SERVER_URL}/uploads/${displayData?.docImage}`} alt={displayData.docName} />
                                <Card.Body>
                                    <Card.Title className='text-center'>{displayData.docName}</Card.Title>
                                </Card.Body>
                                <ListGroup className="list-group-flush fw-bold">
                                    <ListGroup.Item>{displayData.docDepartment}</ListGroup.Item>
                                    <ListGroup.Item>{displayData.docQualification}</ListGroup.Item>
                                </ListGroup>
                            </div>
                        }
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default DoctorCard