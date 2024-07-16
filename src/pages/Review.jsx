import React, { useEffect, useState } from 'react'
import DashboardNav from '../components/DashboardNav'
import MsgCard from '../components/MsgCard'
import { Col, Container, Row } from 'react-bootstrap'
import TinyFooter from '../components/TinyFooter'
import { getAllMessageAPI } from '../services/allAPI'

function Review() {
    const [allReviews, setAllReviews] = useState([])
    useEffect(() => {
        getAllMessage()
    }, [])

    const getAllMessage = async () => {
        const token = sessionStorage.getItem("token")
        const reqHeader = {
            "Authorization": `Bearer ${token}`
        }
        try {
            const result = await getAllMessageAPI(reqHeader)
            console.log(result);
            if (result.status == 200) {
                setAllReviews(result.data)
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
                    {allReviews?.length > 0 ?
                        allReviews?.map(review => (
                            <Col key={review} sm={12} md={6} lg={4}>
                                <MsgCard displayData={review} />
                            </Col>
                        ))
                        :
                        <div className="fw-bolder text-danger m-5 text-center">Currently no messages received!!!</div>
                    }
                </Row>
            </Container>
            <div className='footer fixed-bottom'>
                <TinyFooter />
            </div>
        </>
    )
}

export default Review