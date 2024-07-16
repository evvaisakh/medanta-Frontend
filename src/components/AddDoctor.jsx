import React, { useContext, useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import docIcon from '../assets/docIcon.png'
import { ToastContainer, Zoom, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addDoctorAPI } from '../services/allAPI';
import { addResponseContext } from '../context/ContextAPI';

function AddDoctor() {
    const { addResponse, setAddResponse } = useContext(addResponseContext)
    const [doctorDetails, setDoctorDetails] = useState({
        docName: "", docDepartment: "", docQualification: "", docEmail: "", docPhone: "", docImage: ""
    })
    console.log(doctorDetails);

    const [preview, setPreview] = useState("")
    const [imageFileStatus, setImageFileStatus] = useState(false)

    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false)
        setDoctorDetails({ docName: "", docDepartment: "", docQualification: "", docEmail: "", docPhone: "", docImage: "" })
    };
    const handleShow = () => setShow(true);

    useEffect(() => {
        if (doctorDetails.docImage.type == "image/png" || doctorDetails.docImage.type == "image/jpg" || doctorDetails.docImage.type == "image/jpeg") {
            setImageFileStatus(true)
            setPreview(URL.createObjectURL(doctorDetails.docImage))
        } else {
            setPreview(docIcon)
            setImageFileStatus(false)
            setDoctorDetails({ ...doctorDetails, docImage: "" })
        }
    }, [doctorDetails.docImage])

    const handleAddDoctor = async () => {
        const { docName, docDepartment, docQualification, docEmail, docPhone, docImage } = doctorDetails
        if (!docName || !docDepartment || !docQualification || !docEmail || !docPhone || !docImage) {
            toast.warning("Please fill the form completely!!!")
        } else {
            const reqBody = new FormData()
            reqBody.append("docName", docName)
            reqBody.append("docDepartment", docDepartment)
            reqBody.append("docQualification", docQualification)
            reqBody.append("docEmail", docEmail)
            reqBody.append("docPhone", docPhone)
            reqBody.append("docImage", docImage)

            const token = sessionStorage.getItem("token")
            if (token) {
                const reqHeader = {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`
                }
                // api call
                try {
                    const result = await addDoctorAPI(reqBody, reqHeader)
                    console.log(result);
                    if (result.status == 200) {
                        setAddResponse(result)
                        handleClose()
                    } else {
                        toast.warning(result.response.data)
                    }
                } catch (err) {
                    console.log(err);
                }
            }
        }
    }
    return (
        <>
            <Button onClick={handleShow} variant="outline-info rounded-pill">New Doctor<i className="fa-solid fa-user-plus ps-2"></i></Button>
            <Modal
                size='lg'
                centered
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add New Doctor</Modal.Title>
                </Modal.Header>
                <Modal.Body className='bg-primary-subtle'>
                    <div className="row align-items-center">
                        <div className="col-lg-4">
                            <label>
                                <input type="file" style={{ display: 'none' }} onChange={e => setDoctorDetails({ ...doctorDetails, docImage: e.target.files[0] })} />
                                <img height={'200px'} className='img-fluid' src={preview} alt="" />
                            </label>
                            {!imageFileStatus &&
                                <div className="text-info my-2">*Upload only following file types (png, jpg, jpeg) here!!!</div>
                            }
                        </div>
                        <div className="col-lg-8">
                            <div className='mb-2'>
                                <input type="text" className='form-control my-2' placeholder='Name' value={doctorDetails.docName}
                                    onChange={(e) => setDoctorDetails({ ...doctorDetails, docName: e.target.value })} />
                            </div>
                            <div className='mb-2'>
                                <input type="email" className='form-control' placeholder='Email' value={doctorDetails.docEmail}
                                    onChange={(e) => setDoctorDetails({ ...doctorDetails, docEmail: e.target.value })} />
                            </div>
                            <div className='mb-2'>
                                <input type="text" className='form-control' placeholder='Department' value={doctorDetails.docDepartment}
                                    onChange={(e) => setDoctorDetails({ ...doctorDetails, docDepartment: e.target.value })} />
                            </div>
                            <div className='mb-2'>
                                <input type="text" className='form-control my-2' placeholder='Qualification' value={doctorDetails.docQualification}
                                    onChange={(e) => setDoctorDetails({ ...doctorDetails, docQualification: e.target.value })} />
                            </div>
                            <div className='mb-2'>
                                <input type="tel" className='form-control my-2' placeholder='Phone' value={doctorDetails.docPhone}
                                    onChange={(e) => setDoctorDetails({ ...doctorDetails, docPhone: e.target.value })} />
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="success" onClick={handleAddDoctor}>Register</Button>
                </Modal.Footer>
            </Modal>
            <ToastContainer position='top-center' theme='colored' autoClose={3000} transition={Zoom} />
        </>
    )
}

export default AddDoctor