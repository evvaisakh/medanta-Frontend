import React, { useContext, useEffect, useState } from 'react'
import Aos from 'aos'
import 'aos/dist/aos.css'
import { Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap'
import DoctorCard from '../components/DoctorCard'
import AddDoctor from '../components/AddDoctor'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { getAllDoctorAPI } from '../services/allAPI'
import { addResponseContext, editResponseContext } from '../context/ContextAPI'

function DoctorsList() {
    const { editResponse, setEditResponse } = useContext(editResponseContext)
    const { addResponse, setAddResponse } = useContext(addResponseContext)
    const [searchKey, setSearchKey] = useState("")
    const [allDoctor, setAllDoctor] = useState([])
    const [adminLog, setAdminLog] = useState(false)

    useEffect(() => {
        getAllDoctor()
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
    }, [addResponse, editResponse])

    useEffect(() => {
        Aos.init({ duration: 2000 })
    }, [])

    const getAllDoctor = async () => {
        const token = sessionStorage.getItem("token")
        const reqHeader = {
            "Authorization": `Bearer ${token}`
        }
        try {
            const result = await getAllDoctorAPI(searchKey, reqHeader)
            console.log(result);
            if (result.status == 200) {
                setAllDoctor(result.data)
            }
        } catch (err) {
            console.log(err);
        }
    }

    const handleSearch = () => {
        getAllDoctor()
    }

    return (
        <>
            <Header />
            <Container className='mt-5'>
                <div className="d-flex justify-content-between">
                    <h1>Our Doctor's</h1>
                    <InputGroup className="mb-3 w-25">
                        <Form.Control
                            placeholder="Search for department"
                            aria-label="Search for department"
                            aria-describedby="basic-addon2"
                            type='text'
                            value={searchKey}
                            onChange={e => setSearchKey(e.target.value)}
                        />
                        <Button onClick={handleSearch} variant="outline-info" id="button-addon2">
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </Button>
                    </InputGroup>
                    {adminLog && <AddDoctor />}
                </div>
                <Row>
                    {allDoctor?.length > 0 ?
                        allDoctor?.map(doctor => (
                            <Col key={doctor} sm={12} md={6} lg={4}>
                                <DoctorCard displayData={doctor} />
                            </Col>
                        ))
                        :
                        <div className="fw-bolder fs-1 text-danger m-5 text-center">Doctor Not Found!!!</div>}
                </Row>
            </Container>
            <Footer />
        </>
    )
}

export default DoctorsList