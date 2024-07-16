import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, Zoom, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { appointmentAPI, getDocAndDepAPI } from '../services/allAPI';

function AppForm() {
  const navigate = useNavigate()
  const [doctorsInDepartment, setDoctorsInDepartment] = useState("")
  const [departments, setDepartments] = useState("")
  const [loginStatus, setLoginStatus] = useState(false)
  const [bookingDetails, setBookingDetails] = useState({
    name: "", email: "", phone: "", age: "", gender: "", appointmentDate: "", department: "", doctor: "", remarks: ""
  })
  console.log(bookingDetails);
  const [validated, setValidated] = useState(false);
  const [dateError, setDateError] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      setLoginStatus(true)
    } else {
      setLoginStatus(false)
    }
  }, [])

  useEffect(() => {
    getDocAndDep()
  }, [bookingDetails.department])

  const getDocAndDep = async () => {
    const result = await getDocAndDepAPI()
    if (result.status == 200) {
      // Extract unique department names
      const uniqueDepartments = Array.from(new Set(result.data.map(doc => doc.docDepartment)))
      setDepartments(uniqueDepartments)
      // Extract doctors for the selected department
      if (bookingDetails.department) {
        const doctorsForDepartment = result.data.filter(doc => doc.docDepartment === bookingDetails.department)
        setDoctorsInDepartment(doctorsForDepartment)
      }
    } else {
      console.log(result.response.data);
    }
  }

  const handleDateBlur = (e) => {
    const selectedDate = new Date(e.target.value);
    const today = new Date();

    if (selectedDate <= today) {
      setDateError("Appointment date cannot be in the past or today.");
    } else {
      setDateError("");
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.stopPropagation()
    } else {
      const { name, email, phone, age, gender, appointmentDate, department, doctor, remarks } = bookingDetails
      const today = new Date();
      const selectedDate = new Date(appointmentDate);

      if (selectedDate <= today) {
        toast.warning("Appointment date cannot be in the past or today!!!");
        return;
      }

      if (loginStatus) {
        const reqBody = new FormData()
        reqBody.append("name ", name)
        reqBody.append("email", email)
        reqBody.append("phone", phone)
        reqBody.append("age", age)
        reqBody.append("gender", gender)
        reqBody.append("appointmentDate", appointmentDate)
        reqBody.append("department", department)
        reqBody.append("doctor", doctor)
        reqBody.append("remarks", remarks)

        const token = sessionStorage.getItem("token")

        if (token) {
          const reqHeader = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }

          try {
            const result = await appointmentAPI(reqBody, reqHeader)
            console.log(result);
            if (result.status == 200) {
              toast.success("Appointment booked. Our representative will contact you shortly!!!")
              setBookingDetails({ name: "", email: "", phone: "", age: "", gender: "", appointmentDate: "", department: "", doctor: "", remarks: "" })
              setTimeout(() => {
                navigate('/commondash')
              }, 2000)
            } else {
              toast.error(result.response.data)
            }
          } catch (err) {
            console.log(err);
          }
        }
      } else {
        toast.warning("Please login/register to book appointment!!!")
        setTimeout(() => {
          navigate('/login')
        }, 2000)
      }
    }
    setValidated(true)
  }

  return (
    <>
      <Container className='m-5 p-5 shadow bg-info-subtle'>
        <h2 className='text-center fw-bold'>Book An Appointment <i className="fa-solid fa-headset fa-shake text-info"></i></h2>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className='mb-3' controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  value={bookingDetails.name} onChange={e => setBookingDetails({ ...bookingDetails, name: e.target.value })}
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
                  value={bookingDetails.email} onChange={e => setBookingDetails({ ...bookingDetails, email: e.target.value })}
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
                  value={bookingDetails.phone} onChange={e => setBookingDetails({ ...bookingDetails, phone: e.target.value })}
                  type="tel"
                  placeholder="Enter your phone number"
                  required
                  pattern="[0-9]{10}"
                />
                <Form.Control.Feedback type="invalid">Please enter a valid phone number.</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className='mb-3' controlId="age">
                <Form.Label>Age</Form.Label>
                <Form.Control
                  value={bookingDetails.age} onChange={e => setBookingDetails({ ...bookingDetails, age: e.target.value })}
                  type="number"
                  placeholder="Enter your age"
                  required
                  min="0"
                />
                <Form.Control.Feedback type="invalid">Please enter your age.</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className='mb-3' controlId="gender">
                <Form.Label>Gender</Form.Label>
                <Form.Select
                  value={bookingDetails.gender} onChange={e => setBookingDetails({ ...bookingDetails, gender: e.target.value })}
                  as="select"
                  required
                >
                  <option value="">Select </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">Please select your gender.</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className='mb-3' controlId="appointmentDate">
                <Form.Label>Appointment Date</Form.Label>
                <Form.Control
                  value={bookingDetails.appointmentDate} onChange={e => setBookingDetails({ ...bookingDetails, appointmentDate: e.target.value })}
                  onBlur={handleDateBlur}
                  type="date"
                  required
                />
                <Form.Control.Feedback type="invalid">Please select appointment date.</Form.Control.Feedback>
                {dateError && <div className="text-danger">{dateError}</div>}
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className='mb-3' controlId="department">
                <Form.Label>Department</Form.Label>
                <Form.Select
                  value={bookingDetails.department} onChange={e => setBookingDetails({ ...bookingDetails, department: e.target.value })}
                  as="select"
                  required
                >
                  <option value="">Select a Department</option>
                  {departments?.length > 0 &&
                    departments?.map(dept => (
                      <option value={dept}>{dept}</option>
                    ))
                  }
                </Form.Select>
                <Form.Control.Feedback type="invalid">Please select a department.</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className='mb-3' controlId="doctor">
                <Form.Label>Doctor</Form.Label>
                <Form.Select
                  value={bookingDetails.doctor} onChange={e => setBookingDetails({ ...bookingDetails, doctor: e.target.value })}
                  as="select"
                  required
                >
                  <option value="">Available Doctor's</option>
                  {doctorsInDepartment?.length > 0 &&
                    doctorsInDepartment?.map(doc => (
                      <option value={doc.docName}>{doc.docName}</option>
                    ))
                  }
                </Form.Select>
                <Form.Control.Feedback type="invalid">Please select a doctor.</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className='mb-3' controlId="remarks">
                <Form.Label>Remarks</Form.Label>
                <Form.Control
                  value={bookingDetails.remarks} onChange={e => setBookingDetails({ ...bookingDetails, remarks: e.target.value })}
                  as="textarea"
                  rows={3}
                  placeholder="Enter remarks (if any)"
                />
              </Form.Group>
            </Col>
          </Row>
          <div className='d-flex justify-content-around'>
            <Form.Group controlId="amount">
              <Form.Label className='fw-bold text-danger'>Booking Charges</Form.Label>
              <Form.Control
                className='fw-bold border border-danger rounded w-50'
                type="text"
                placeholder="₹ 100/-"
                readOnly
              />
            </Form.Group>
            <div className='mt-4'>
              <Button variant="outline-info rounded" type="submit">
                Pay and Submit
              </Button>
            </div>
          </div>
        </Form>
      </Container>
      <ToastContainer position='top-center' theme='colored' autoClose={4000} transition={Zoom} />
    </>
  )
}

export default AppForm