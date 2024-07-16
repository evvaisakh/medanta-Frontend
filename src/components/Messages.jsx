import React, { useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { ToastContainer, Zoom, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { sendMessageAPI } from '../services/allAPI';

function Messages() {
    const navigate = useNavigate()
    const [messageDetails, setMessageDetails] = useState({
        name: "", email: "", phone: "", subject: "", message: ""
    })
    console.log(messageDetails);
    const [validated, setValidated] = useState(false);

    const handleSendMsg = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const { name, email, phone, subject, message } = messageDetails
        if (form.checkValidity() === false) {
            e.stopPropagation()
            setValidated(true)
        } else {
            const reqBody = new FormData()
            reqBody.append("name", name)
            reqBody.append("email", email)
            reqBody.append("phone", phone)
            reqBody.append("subject", subject)
            reqBody.append("message", message)

            try {
                const result = await sendMessageAPI(reqBody)
                console.log(result);
                if (result.status == 200) {
                    toast.success("Message has been send successufully!!!")
                    setMessageDetails({ name: "", email: "", phone: "", subject: "", message: "" })
                    setTimeout(() => {
                        navigate('/')
                    }, 2000)
                } else {
                    toast.error(result.response.data)
                }
            } catch (err) {
                console.log(err);
            }
        }
    }

    return (
        <>
            <Container className='m-5 p-5 shadow bg-success-subtle'>
                <h2 className='text-center fw-bold'>Leave Us A Message <i className="fa-solid fa-message fa-bounce fa-xl text-success"></i></h2>
                <Form noValidate validated={validated} onSubmit={handleSendMsg}>
                    <Row>
                        <Col md={6}>
                            <Form.Group className='mb-3' controlId="name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    value={messageDetails.name} onChange={e => setMessageDetails({ ...messageDetails, name: e.target.value })}
                                    type="text"
                                    placeholder="Enter your name"
                                    required
                                />
                                <Form.Control.Feedback type="invalid">Please enter your name.</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className='mb-3' controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    value={messageDetails.email} onChange={e => setMessageDetails({ ...messageDetails, email: e.target.value })}
                                    type="email"
                                    placeholder="Enter your email"
                                    required
                                    pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                                />
                                <Form.Control.Feedback type="invalid">Please enter a valid email address.</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Form.Group className='mb-3' controlId="phone">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control
                                    value={messageDetails.phone} onChange={e => setMessageDetails({ ...messageDetails, phone: e.target.value })}
                                    type="tel"
                                    placeholder="Enter your phone number"
                                    required
                                    pattern="[0-9]{10}"
                                />
                                <Form.Control.Feedback type="invalid">Please enter a valid phone number.</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className='mb-3' controlId="subject">
                                <Form.Label>Subject</Form.Label>
                                <Form.Control
                                    value={messageDetails.subject} onChange={e => setMessageDetails({ ...messageDetails, subject: e.target.value })}
                                    type="text"
                                    placeholder="Specify the subject (if any)"
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group className='mb-3' controlId="message">
                                <Form.Label>Message</Form.Label>
                                <Form.Control
                                    value={messageDetails.message} onChange={e => setMessageDetails({ ...messageDetails, message: e.target.value })}
                                    as="textarea"
                                    rows={3}
                                    placeholder="Enter your message..."
                                    required
                                />
                                <Form.Control.Feedback type="invalid">Please enter your message.</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <div className='text-center'>
                        <Button variant="outline-success rounded" type="submit">
                            Send Message
                        </Button>
                    </div>
                </Form>
            </Container>
            <ToastContainer position='top-center' theme='colored' autoClose={3000} transition={Zoom} />
        </>
    )
}

export default Messages