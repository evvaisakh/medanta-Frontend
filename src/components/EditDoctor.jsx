import React, { useContext, useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { ToastContainer, Zoom, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SERVER_URL } from '../services/serverUrl';
import { editDoctorAPI } from '../services/allAPI';
import { editResponseContext } from '../context/ContextAPI';

function EditDoctor({ displayData }) {
    const { editResponse, setEditResponse } = useContext(editResponseContext)
    const [doctorData, setDoctorData] = useState({
        id: displayData?._id, docName: displayData?.docName, docDepartment: displayData?.docDepartment, docQualification: displayData?.docQualification, docEmail: displayData?.docEmail, docPhone: displayData?.docPhone, docImage: ""
    })

    const [preview, setPreview] = useState("")

    const [show, setShow] = useState(false);

    useEffect(() => {
        if (doctorData.docImage) {
            setPreview(URL.createObjectURL(doctorData.docImage))
        } else {
            setPreview("")
        }
    }, [doctorData?.docImage])

    const handleClose = () => {
        setShow(false)
        setDoctorData({ id: displayData?._id, docName: displayData?.docName, docDepartment: displayData?.docDepartment, docQualification: displayData?.docQualification, docEmail: displayData?.docEmail, docPhone: displayData?.docPhone, docImage: "" })
        setPreview("")
    };
    const handleShow = () => {
        setShow(true)
        setDoctorData({ id: displayData?._id, docName: displayData?.docName, docDepartment: displayData?.docDepartment, docQualification: displayData?.docQualification, docEmail: displayData?.docEmail, docPhone: displayData?.docPhone, docImage: "" })
    };

    const handleUpdateDoctor = async () => {
        const { docName, docDepartment, docQualification, docEmail, docPhone, docImage } = doctorData
        if (!docName || !docDepartment || !docQualification || !docEmail || !docPhone) {
            toast.warning("Please fill the form completely!!!")
        } else {
            const reqBody = new FormData()
            reqBody.append("docName", docName)
            reqBody.append("docDepartment", docDepartment)
            reqBody.append("docQualification", docQualification)
            reqBody.append("docEmail", docEmail)
            reqBody.append("docPhone", docPhone)
            preview ? reqBody.append("docImage", docImage) : reqBody.append("docImage", displayData.docImage)

            const token = sessionStorage.getItem("token")
            if (token) {
                const reqHeader = {
                    "Content-Type": preview ? "multipart/form-data" : "application/json",
                    "Authorization": `Bearer ${token}`
                }
                // api call
                try {
                    const result = await editDoctorAPI(doctorData.id, reqBody, reqHeader)
                    console.log(result);
                    if (result.status == 200) {
                        handleClose()
                        setEditResponse(result)
                    } else {
                        console.log(result.response);
                    }
                } catch (err) {
                    console.log(err);
                }
            }
        }
    }
    return (
        <>
            <Button onClick={handleShow} variant="link"><i className="fa-solid fa-pen-to-square text-info"></i></Button>
            <Modal
                size='lg'
                centered
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Update Doctor Details</Modal.Title>
                </Modal.Header>
                <Modal.Body className='bg-primary-subtle'>
                    <div className="row align-items-center">
                        <div className="col-lg-4">
                            <label>
                                <input type="file" style={{ display: 'none' }} onChange={e => setDoctorData({ ...doctorData, docImage: e.target.files[0] })} />
                                <img height={'200px'} className='img-fluid' src={preview ? preview : `${SERVER_URL}/uploads/${displayData?.docImage}`} alt="displayData?.docName" />
                            </label>
                        </div>
                        <div className="col-lg-8">
                            <div className='mb-2'>
                                <input type="text" className='form-control my-2' placeholder='Name' value={doctorData.docName}
                                    onChange={e => setDoctorData({ ...doctorData, docName: e.target.value })} />
                            </div>
                            <div className='mb-2'>
                                <input type="email" className='form-control' placeholder='Email' value={doctorData.docEmail}
                                    onChange={e => setDoctorData({ ...doctorData, docEmail: e.target.value })} />
                            </div>
                            <div className='mb-2'>
                                <input type="text" className='form-control' placeholder='Department' value={doctorData.docDepartment}
                                    onChange={e => setDoctorData({ ...doctorData, docDepartment: e.target.value })} />
                            </div>
                            <div className='mb-2'>
                                <input type="text" className='form-control my-2' placeholder='Qualification' value={doctorData.docQualification}
                                    onChange={e => setDoctorData({ ...doctorData, docQualification: e.target.value })} />
                            </div>
                            <div className='mb-2'>
                                <input type="tel" className='form-control my-2' placeholder='Phone' value={doctorData.docPhone}
                                    onChange={e => setDoctorData({ ...doctorData, docPhone: e.target.value })} />
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="success" onClick={handleUpdateDoctor}>Update</Button>
                </Modal.Footer>
            </Modal>
            <ToastContainer position='top-center' theme='colored' autoClose={3000} transition={Zoom} />
        </>
    )
}

export default EditDoctor