import React, { useEffect, useState } from 'react'
import DashboardNav from '../components/DashboardNav'
import TinyFooter from '../components/TinyFooter'
import { Card, Col, Container, Row, Table } from 'react-bootstrap'
import { getUserAppointmentAPI } from '../services/allAPI'

function CommonDash() {
    const [userAppointment, setUserAppointment] = useState([])

    useEffect(() => {
        getUserAppointment()
    }, [])

    const getUserAppointment = async () => {
        const token = sessionStorage.getItem("token")
        const reqHeader = {
            "Authorization": `Bearer ${token}`
        }
        try {
            const result = await getUserAppointmentAPI(reqHeader)
            console.log(result);
            if (result.status == 200) {
                setUserAppointment(result.data)
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <DashboardNav />
            <Container className='mt-5 mb-5'>
                <Row>
                    {/* First Box - Welcome User with Image */}
                    <Col md={4}>
                        <Card className='shadow rounded'>
                            <Card.Body className='text-center'>
                                <Card.Title>Total Appointments</Card.Title>
                                <Card.Text>{userAppointment.length}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                {/* Table of Appointments */}

                <Row className="mt-5 mb-5">
                    <Col>
                        <h3>Appointments Booked</h3>
                        <Table striped bordered hover responsive className='border border-info-subtle border-3'>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Patient</th>
                                    <th>Appointment On</th>
                                    <th>Doctor</th>
                                    <th>Department</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    userAppointment?.length > 0 ?
                                        userAppointment?.map((appoint, index) => (
                                            <tr>
                                                <td>{index + 1}</td>
                                                <td>{appoint.name}</td>
                                                <td>{appoint.appointmentDate}</td>
                                                <td>{appoint.doctor}</td>
                                                <td>{appoint.department}</td>
                                            </tr>
                                        ))
                                        :
                                        <div className="fw-bolder fs-2 text-warning text-center m-3">No bookings yet!!!</div>
                                }
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
            <TinyFooter />
        </>
    )
}

export default CommonDash