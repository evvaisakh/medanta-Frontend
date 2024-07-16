import React from 'react'
import { Link } from 'react-router-dom'
import medLogo from '../assets/medantalogo.png'
import { Col, Container, Row } from 'react-bootstrap'
import TinyFooter from './TinyFooter'

function Footer() {
    return (
        <>
            <Container fluid className="mt-5 shadow bg-info-subtle">
                <Row className="py-4">
                    <Col md={3} className="text-md-start">
                        <img src={medLogo} alt="Brand" className="mb-2" style={{ maxWidth: '50%', height: 'auto' }} />
                        <p>
                            <span className='text-success fs-4 fw-bold'>Medanta Medcity</span> is ready to heal patients with the utmost care, concern, and precision. We treat you right from the first consulting stage, to a great healing and recovery process.
                        </p>
                    </Col>
                    <Col md={3}>
                        <h4 className="mb-4">Quick Links</h4>
                        <ul className="list-unstyled">
                            <li><Link to={'/'} style={{ textDecoration: 'none' }}><i className="fa-solid fa-house"></i> Home</Link></li>
                            <li><Link to={'/aboutus'} style={{ textDecoration: 'none' }}><i className="fa-solid fa-file-contract"></i> About Us</Link></li>
                            <li><Link to={'/doctorslist'} style={{ textDecoration: 'none' }}><i className="fa-solid fa-user-doctor"></i> Doctors</Link></li>
                            <li><Link to={'/contactus'} style={{ textDecoration: 'none' }}><i className="fa-solid fa-square-phone"></i> Contact Us</Link></li>
                        </ul>
                    </Col>
                    <Col md={3}>
                        <h4 className="mb-4">Download Our App</h4>
                        <p><a href={'https://play.google.com/store/games?device=windows'} target='_blank' style={{ textDecoration: 'none' }}><i className="fa-brands fa-google-play fa-xl pe-1"></i>Get it on Google Play</a></p>
                        <p><a href={'https://www.apple.com/app-store/'} target='_blank' style={{ textDecoration: 'none' }}><i className="fa-brands fa-apple fa-2xl pe-1"></i>Get it on App Store</a></p>
                    </Col>
                    <Col md={3}>
                        <h4 className="mb-4">Subscribe To Our Newsletter</h4>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder='Enter your Email Id' />
                            <button className='btn btn-warning'><i className="fa-solid fa-arrow-right fa-beat"></i></button>
                        </div>
                        <div className="mt-3">
                            <p>Follow Us:</p>
                            <Link to={'https://facebook.com/'} target='_blank' className="me-2"><i className="fa-brands fa-facebook"></i></Link>
                            <Link to={'https://instagram.com/'} target='_blank' className="me-2"><i className="fa-brands fa-instagram"></i></Link>
                            <Link to={'https://pinterest.com/'} target='_blank' className="me-2"><i className="fa-brands fa-pinterest"></i></Link>
                            <Link to={'https://twitter.com/'} target='_blank' className="me-2"><i className="fa-brands fa-x-twitter"></i></Link>
                            <Link to={'https://linkedin.com/'} target='_blank'><i className="fa-brands fa-linkedin"></i></Link>
                        </div>
                    </Col>
                </Row>
            </Container>
            <TinyFooter />
        </>
    )
}

export default Footer