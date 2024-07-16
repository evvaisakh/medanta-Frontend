import React, { useState } from 'react'
import FancyCarousel from "react-fancy-circular-carousel";
import 'react-fancy-circular-carousel/FancyCarousel.css';

import image1 from '../assets/hospital1.jpg';
import image2 from '../assets/hospital2.jpg';
import image3 from '../assets/hospital3.jpg';
import image4 from '../assets/hospital4.png';
import image5 from '../assets/hospital5.jpg';
import { Col, Container, Row } from 'react-bootstrap';

function CircleCarousel() {
  const [focusElement, setFocusElement] = useState(0)
  const images = [image1, image2, image3, image4, image5]
  const info = ['Medanta - The Medicity, Gurugram', 'Medanta Super Speciality Hospital, Lucknow',
    'Jay Prabha Medanta Super Specialty Hospital, Patna', 'Medanta Super Speciality Hospital, Indore', 'Medanta Abdur Razzaque Ansari Memorial Weavers Hospital, Ranchi']
  const para = ['The hospital is equipped to make quality healthcare a reality for countless patients with an infrastructure built according to the guidelines for healthcare facilities by the American Institute of Architects.',
    'The hospital aims to provide the highest standard of tertiary healthcare to the entire state and complies with international quality standards. It offers unmatched infrastructure, advanced medical technology, and personalized care.',
    'Brining world-class, holistic healthcare at an affordable cost to the citizens of Bihar, Jay Prabha Medanta Super Specialty Hospital has transformed the healthcare landscape in the state and surrounding areas with its exceptional medical professionals, advanced technology, and comprehensive range of specialties.',
    'Medanta Indore is one of central Indias most advanced superspeciality institutes that has redefined the standard of excellence in healthcare delivery by bringing together the best of medical expertise, infrastructure, technology, training and education.',
    'We have created an ecosystem of excellence with renowned clinicians, state-of-the-art equipment, and best-in-class infrastructure to deliver world-class, patient-centric, integrated and affordable services.']

  return (
    <>
      <Container>
        <Row>
          <Col md={6} className='mt-5 mb-4'>
            <div className="carousel mt-5 ms-4">
              <FancyCarousel images={images}
                setFocusElement={setFocusElement}
                carouselRadius={200}
                peripheralImageRadius={80}
                centralImageRadius={100}
                focusElementStyling={{ border: '2px solid #ba4949' }}
                autoRotateTime={3}
                borderWidth={4}
                borderHexColor={'1c364f'}
              />
            </div>
          </Col>
          <Col md={6} className='d-flex justify-content-center align-items-center'>
            <div className="info-box-wrapper p-5 bg-success-subtle shadow">
              <h4 className='fw-bold'> {info[focusElement]} </h4>
              <p className='fw-bolder fst-italic'> {para[focusElement]} </p>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default CircleCarousel