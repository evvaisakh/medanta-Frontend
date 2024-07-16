import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import aboutImg from '../assets/aboutus.jpg'
import { Breadcrumb } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Messages from '../components/Messages'

function ContactUs() {
    return (
        <>
            <Header />
            <div className='aboutus'>
                <img src={aboutImg} className='img-fluid' alt="" />
                <div className='left-center'>
                    <Breadcrumb>
                        <Breadcrumb.Item><Link to={'/'}>Home</Link></Breadcrumb.Item>
                        <Breadcrumb.Item active>Contact Us</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
            </div>
            <Messages />
            <Footer />
        </>
    )
}

export default ContactUs