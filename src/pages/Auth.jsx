import React, { useState } from 'react'
import Header from '../components/Header'
import { FloatingLabel, Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import loginImg from '../assets/loginImg.png'
import { ToastContainer, Zoom, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginAPI, registerAPI } from '../services/allAPI'
import TinyFooter from '../components/TinyFooter'

function Auth({ insideRegister }) {
    const navigate = useNavigate()
    const [userInputs, setUserInputs] = useState({
        username: "", email: "", password: ""
    })
    console.log(userInputs);

    const handleRegister = async (e) => {
        e.preventDefault()
        if (userInputs.username && userInputs.email && userInputs.password) {
            // api call
            try {
                const result = await registerAPI(userInputs)
                console.log(result);
                if (result.status == 200) {
                    toast.success(`Welcome ${result.data.username}... Please Login to update !!!`)
                    setUserInputs({ username: "", email: "", password: "" })
                    setTimeout(() => {
                        navigate('/login')
                    }, 2000)
                } else {
                    toast.error(result.response.data)
                    setTimeout(() => {
                        setUserInputs({ username: "", email: "", password: "" })
                    }, 2000)
                }
            } catch (err) {
                console.log(err);
            }
        } else {
            toast.warning('Please fill the form completely!!!')
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        if (userInputs.email && userInputs.password) {
            // api call
            try {
                const result = await loginAPI(userInputs)
                if (result.status == 200) {
                    // store existingUser and token
                    if (result.data.existingUser.isAdmin == true) {
                        sessionStorage.setItem("existingUser", JSON.stringify(result.data.existingUser))
                        sessionStorage.setItem("token", result.data.token)
                        toast.warning(`Welcome ${result.data.existingUser.username}...`)
                        setUserInputs({ username: "", email: "", password: "" })
                        setTimeout(() => {
                            navigate('/dashboard')
                        }, 2000)
                    } else {
                        sessionStorage.setItem("existingUser", JSON.stringify(result.data.existingUser))
                        sessionStorage.setItem("token", result.data.token)
                        toast.warning(`Welcome ${result.data.existingUser.username}...`)
                        setUserInputs({ username: "", email: "", password: "" })
                        setTimeout(() => {
                            navigate('/commondash')
                        }, 2000)
                    }
                } else {
                    toast.error(result.response.data)
                }
            } catch (err) {
                console.log(err);
            }
        } else {
            toast.error("Please fill the form completely!!!")
        }
    }

    return (
        <>
            <Header />
            <div style={{ width: '100%', minHeight: '100vh' }} className='d-flex justify-content-center align-items-center mt-5'>
                <div className="container w-75">
                    <div className="card shadow bg-warning-subtle p-4 mt-2 mb-5">
                        <div className="row align-items-center">
                            <div className="col-lg-6">
                                <img className='w-100' src={loginImg} alt="Auth" />
                            </div>
                            <div className="col-lg-6">
                                <h1 className='fw-bolder mt-2'>
                                    <i className="fa-solid fa-notes-medical text-danger"></i> <span className='text-warning pe-1'>Medanta</span>
                                </h1>
                                <h5 className='fw-bolder mt-2'>
                                    Sign {insideRegister ? "up" : "in"} to your Account
                                </h5>
                                <Form>
                                    {
                                        insideRegister &&
                                        <FloatingLabel
                                            controlId="floatingInputName"
                                            label="Username"
                                            className="mb-3"
                                        >
                                            <Form.Control value={userInputs.username} onChange={e => setUserInputs({ ...userInputs, username: e.target.value })} type="text" placeholder="Username" />
                                        </FloatingLabel>
                                    }
                                    <FloatingLabel
                                        controlId="floatingInput"
                                        label="Email address"
                                        className="mb-3"
                                    >
                                        <Form.Control value={userInputs.email} onChange={e => setUserInputs({ ...userInputs, email: e.target.value })} type="email" placeholder="name@example.com" />
                                    </FloatingLabel>
                                    <FloatingLabel controlId="floatingPassword" label="Password">
                                        <Form.Control value={userInputs.password} onChange={e => setUserInputs({ ...userInputs, password: e.target.value })} type="password" placeholder="Password" />
                                    </FloatingLabel>
                                    {
                                        insideRegister ?
                                            <div className="mt-3">
                                                <button onClick={handleRegister} className="btn btn-info mb-2 rounded-3">Register</button>
                                                <p>Already have an Account? Click here to <Link className='text-info' to={'/login'}>Login</Link></p>
                                            </div>
                                            :
                                            <div className="mt-3">
                                                <button onClick={handleLogin} className="btn btn-success mb-2 rounded-3">Login</button>
                                                <p>New User? Click here to <Link className='text-info' to={'/register'}>Register</Link></p>
                                            </div>
                                    }
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <TinyFooter />
            <ToastContainer position='top-center' theme='colored' autoClose={3000} transition={Zoom} />
        </>
    )
}

export default Auth