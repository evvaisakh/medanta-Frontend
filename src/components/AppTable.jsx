import React, { useEffect, useState } from 'react'
import { Col, Row, Table } from 'react-bootstrap'
import { getAllAppointmentAPI } from '../services/allAPI'

function AppTable({ setAppointmentCount }) {
    const [allAppointments, setAllAppointments] = useState([])

    useEffect(() => {
        getAllAppointments()
    }, [setAppointmentCount(allAppointments.length)])

    const getAllAppointments = async () => {
        try {
            const result = await getAllAppointmentAPI()
            if (result.status == 200) {
                setAllAppointments(result.data)
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <Row className="mt-5 mb-5">
                <Col>
                    <h3>Appointments Booked</h3>
                    <Table striped bordered hover responsive>
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
                                allAppointments?.length > 0 ?
                                    allAppointments?.map((appoint, index) => (
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
        </>
    )
}

export default AppTable