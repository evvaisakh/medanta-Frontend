import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Accordion, Breadcrumb, Col, Container, Row } from 'react-bootstrap'
import aboutImg from '../assets/aboutus.jpg'
import { Link } from 'react-router-dom'

function AboutUs() {
    return (
        <>
            <Header />
            <div className='aboutus'>
                <img src={aboutImg} className='img-fluid' alt="" />
                <div className='left-center'>
                    <Breadcrumb>
                        <Breadcrumb.Item><Link to={'/'}>Home</Link></Breadcrumb.Item>
                        <Breadcrumb.Item active>About Us</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
            </div>
            <Container className='m-5'>
                <Row>
                    <Col lg={4} className='mt-4'>
                        <div className="card bg-info-subtle mb-2 shadow rounded" style={{ width: '18rem' }}>
                            <div className="row g-0">
                                <div className="col-md-4">
                                    <img src="https://cdn0.iconfinder.com/data/icons/medical-1-7/128/Medical-02-1024.png" className="img-fluid rounded-start" alt="..." />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h5 className="card-title">Emergency Cases</h5>
                                        <p className="card-text"><i className="fa-solid fa-phone-volume"></i> 1234-5678-10</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col lg={8}>
                        <Accordion className='shadow text-info-emphasis'>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>About Medanta</Accordion.Header>
                                <Accordion.Body style={{ textAlign: 'justify' }}>
                                    Medanta one of the country's largest multi-speciality tertiary care provider is founded by Dr. Naresh Trehan, a world-renowned cardiovascular and cardiothoracic surgeon, with the mission to deliver advanced but affordable medical services to patients. For four years in a row, Medanta Gurugram ranked the best private hospital in India in 2020, 2021, 2022 and 2023. It also featured in the list of top 250 global hospitals in 2023 by Newsweek.
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                                <Accordion.Header>Our Mission</Accordion.Header>
                                <Accordion.Body style={{ textAlign: 'justify' }}>
                                    Our mission is to deliver world class, patient centric, integrated and affordable healthcare through a dynamic institution that focuses on the development of people and knowledge. Medanta aim's is to provide better treatment with the latest technology on one platform to anyone suffering from organ failure and related diseases all over the world. Every effort that is being made in the world to find a solution against organ failure, we dream of bringing them on a single platform. So that we all can fight together and give people a chance to live their life in a better world.
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="2">
                                <Accordion.Header>Our Core Values</Accordion.Header>
                                <Accordion.Body style={{ textAlign: 'justify' }}>
                                    Medanta is established with the sole mission to deliver world-class, holistic and affordable healthcare and to build a dynamic institution that focuses on the development of people and new Knowledge. Over the years Medanta has evolved but the values it's built on remain the same. Our vision is to lead awareness among our communities about organ transplant and assist patients who are losing their lives and livelihood due to non-availability of the organ and related diseases.
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </Col>
                </Row>
            </Container >
            <Footer />
        </>
    )
}

export default AboutUs