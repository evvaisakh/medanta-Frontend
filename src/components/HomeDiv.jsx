import React from 'react'
import { Button, Col, Container, ListGroup, Row } from 'react-bootstrap'
import hospitalImg from '../assets/hospital.gif'
import { Link } from 'react-router-dom'
import Departments from './Departments'

function HomeDiv() {
  return (
    <>
      <Container fluid>
        <Row className='m-5'>
          <Col sm>
            <div className='border border-dark-subtle border-5 p-4 bg-warning-subtle'>
              <h4 className='mb-4'><i className="fa-solid fa-house-medical text-info"></i> Hospital Facilities</h4>
              <p><span className='text-info fs-4 fw-bold'>Medanta Medicity</span> could achieve the trust from our patients through our 40 years of services for our outstanding facilities.</p>
              <ListGroup>
                <ListGroup.Item variant="success"><i className="fa-solid fa-circle-chevron-right text-info"></i> Friendly Consultation</ListGroup.Item>
                <ListGroup.Item variant="success"><i className="fa-solid fa-circle-chevron-right text-info"></i> Quality Doctors</ListGroup.Item>
                <ListGroup.Item variant="success"><i className="fa-solid fa-circle-chevron-right text-info"></i> Professional Experts</ListGroup.Item>
                <ListGroup.Item variant="success"><i className="fa-solid fa-circle-chevron-right text-info"></i> Modular Operation Theater</ListGroup.Item>
                <ListGroup.Item variant="success"><i className="fa-solid fa-circle-chevron-right text-info"></i> 24/7 Opened</ListGroup.Item>
              </ListGroup>
            </div>
          </Col>
          <Col sm>
            <div className='d-flex flex-column justify-content-center align-items-center'>
              <h3 className='text-center text-info mb-3'>Medanta The Medicity</h3>
              <p style={{ textAlign: 'justify' }} className='fst-italic text-black fw-bold'>Medanta The Medicity is one of the leading hospital with specialized departments. Since 1989 we are here serving the society and having a goodwill. A Team of eminent Administrators and experienced Doctors are the backbone of our organization. We believe in bringing good health to all through our doctors, nurses and other health care professionals. We have specialty and super specialty departments such as general medicine, paediatrics, urology etc. There are all kinds of modern equipment needed for various specialties. The service of experienced medical professionals and most modern equipment is available at a reasonable price.</p>
              <div>
                <Link to={'/aboutus'}><Button variant="outline-info rounded">More About Us <i className="fa-solid fa-angles-right fa-fade"></i></Button></Link>
              </div>
            </div>
          </Col>
        </Row>
        <Row >
          <Col className='bg-secondary-subtle' sm>
            <div className='d-flex flex-column justify-content-center align-items-center p-5'>
              <h3 className='m-4'>Are You Willing To Work With Us?</h3>
              <p>We have various openings in Medical, Pharma and Paramedical fields. We are expecting best candidate profiles who are keen to explore their career and win together with us. Please share your updated profile to <span className='text-black fw-bold'>medantamedcity@gmail.com</span> and CC to <span className='text-black fw-bold'>hr@medantamedcity.com</span></p>
            </div>
          </Col>
          <Col sm>
            <img className='img-fluid' src={hospitalImg} alt="hospitalImage" />
          </Col>
        </Row>
        <div className='mt-5'>
          <div className='p-3 bg-info-subtle'>
            <h2 className="text-center fw-bold">Departments</h2>
            <Departments />
          </div>
          <section className='image d-flex align-items-center'>
            <Row className="justify-content-start w-100">
              <Col sm={12} md={8} lg={6} className='info-box'>
                <h2>For Emergency Cases</h2>
                <h3>+91 1234-5678-10</h3>
                <h6>We are always available to take utmost care for you or your beloved once during any critical conditions. Please dial us anytime for any medical healthcare support.</h6>
              </Col>
            </Row>
          </section>
        </div>
      </Container>
    </>
  )
}

export default HomeDiv