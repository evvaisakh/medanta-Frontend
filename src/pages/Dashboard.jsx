import React, { useEffect, useState } from 'react'
import DashboardNav from '../components/DashboardNav'
import { Card, Col, Container, Row } from 'react-bootstrap'
import AppTable from '../components/AppTable'
import TinyFooter from '../components/TinyFooter'
import { getAllDoctorAPI } from '../services/allAPI'

function Dashboard() {
    const [doctorCount, setDoctorCount] = useState("")
    const [appointmentCount, setAppointmentCount] = useState("")

    useEffect(() => {
        getAllDoctor()
    }, [])

    const getAllDoctor = async () => {
        const token = sessionStorage.getItem("token")
        const reqHeader = {
            "Authorization": `Bearer ${token}`
        }
        try {
            const result = await getAllDoctorAPI(reqHeader)
            console.log(result);
            if (result.status == 200) {
                setDoctorCount(result.data.length)
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <DashboardNav />
            <Container className='mt-5'>
                <Row>
                    {/* First Box - Welcome User with Image */}
                    <Col md={4} className='d-flex align-items-center'>
                        <h2>
                            Welcome <span className='fst-italic text-info'>Admin,</span>
                            <i className="fa-solid fa-user-tie fa-fade fa-xl ps-1"></i>
                        </h2>
                    </Col>

                    {/* Second Box - Total Number of Appointments */}
                    <Col md={4}>
                        <Card className='shadow rounded'>
                            <Card.Body className='text-center'>
                                <Card.Title>Total Appointments</Card.Title>
                                <Card.Text>{appointmentCount}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* Third Box - Number of Doctors */}
                    <Col md={4}>
                        <Card className='shadow rounded'>
                            <Card.Body className='text-center'>
                                <Card.Title>Number of Doctors</Card.Title>
                                <Card.Text>{doctorCount}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* Table of Appointments */}
                <AppTable setAppointmentCount={setAppointmentCount} />

            </Container>
            <TinyFooter />
        </>
    )
}

export default Dashboard