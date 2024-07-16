import React, { useContext, useEffect, useState } from 'react'
import { Container, Nav, NavDropdown, Navbar, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import medLogo from '../assets/medantalogo.png'
import { tokenAuthContext } from '../context/TokenAuth'
import { ToastContainer, Zoom, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function DashboardNav() {
    const { isAuthorised, setIsAuthorised } = useContext(tokenAuthContext)
    const [loginStatus, setLoginStatus] = useState(false)
    const [displayName, setDisplayName] = useState("")
    const navigate = useNavigate()

    const handleLogout = () => {
        sessionStorage.clear()
        setIsAuthorised(false)
        toast.success("Successfully logged out!!!")
        setTimeout(() => {
            navigate('/')
        }, 2000)
    }

    useEffect(() => {
        if (sessionStorage.getItem("existingUser")) {
            const { isAdmin } = JSON.parse(sessionStorage.getItem("existingUser"))
            const { username } = JSON.parse(sessionStorage.getItem("existingUser"))
            setLoginStatus(isAdmin == true)
            setDisplayName(username)

        } else {
            setLoginStatus(false)
            setDisplayName("")
        }
    }, [])

    return (
        <>
            {/* TopNav */}
            <Container fluid className='tophead bg-info-subtle'>
                <Row>
                    <div className="col-lg-12 d-flex justify-content-start my-2 ps-5">
                        <span className='fw-semibold'><i className="fa-solid fa-phone pe-2"></i>Need Help? Call:<a href='' className="ps-1 text-decoration-none">+91 8086 651 651</a></span>
                        <div className="vl mx-2"></div>
                        <span className='fw-semibold'><i className="fa-solid fa-envelope pe-2"></i><a href='' className='text-decoration-none'>info@medanta.org</a></span>
                    </div>
                </Row>
            </Container>

            {/* Navbar */}
            <Navbar sticky='top' expand="lg" bg="info" data-bs-theme="dark" >
                <Container>
                    <Navbar.Brand ><Link to={'/'}><img className='w-100' style={{ height: '40px' }} src={medLogo} alt="Brand" /></Link></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        {loginStatus ?
                            <Nav className="ms-auto">
                                <Nav.Link className='fw-bolder'><Link to={'/'} className='text-light text-decoration-none'>Home</Link></Nav.Link>
                                <Nav.Link className='fw-bolder'><Link to={'/doctorslist'} className='text-light text-decoration-none'>Doctor's</Link></Nav.Link>
                                <Nav.Link className='fw-bolder'><Link to={'/messages'} className='text-light text-decoration-none'>Messages</Link></Nav.Link>
                                <NavDropdown title={displayName?.split(" ")[0]} id="basic-nav-dropdown">
                                    <NavDropdown.Item className='fw-bold'><i className="fa-solid fa-server "></i> <Link to={'/dashboard'} className='text-light text-decoration-none'>Dashboard</Link></NavDropdown.Item>
                                    <NavDropdown.Item onClick={handleLogout} className='fw-bold'><i className="fa-solid fa-right-from-bracket"></i> Logout</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                            :
                            <Nav className="ms-auto">
                                <Nav.Link className='fw-bolder'><Link to={'/'} className='text-light text-decoration-none'>Home</Link></Nav.Link>
                                <Nav.Link className='fw-bolder'><Link to={'/appointment'} className='text-light text-decoration-none'>Book Appointment</Link></Nav.Link>
                                <NavDropdown title={displayName?.split(" ")[0]} id="basic-nav-dropdown">
                                    <NavDropdown.Item className='fw-bold'><i className="fa-solid fa-server "></i> <Link to={'/commondash'} className='text-light text-decoration-none'>Dashboard</Link></NavDropdown.Item>
                                    <NavDropdown.Item onClick={handleLogout} className='fw-bold'><i className="fa-solid fa-right-from-bracket"></i> Logout</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        }
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <ToastContainer position='top-center' theme='colored' autoClose={3000} transition={Zoom} />
        </>
    )
}

export default DashboardNav