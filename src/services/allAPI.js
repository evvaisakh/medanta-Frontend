import { commonAPI } from "./commonAPI"
import { SERVER_URL } from "./serverUrl"


// register api
export const registerAPI = async (reqBody) => {
    return await commonAPI("POST", `${SERVER_URL}/register`, reqBody)
}

// login api
export const loginAPI = async (reqBody) => {
    return await commonAPI("POST", `${SERVER_URL}/login`, reqBody)
}

// book appointment api
export const appointmentAPI = async (reqBody, reqHeader) => {
    return await commonAPI("POST", `${SERVER_URL}/book-appointment`, reqBody, reqHeader)
}

// get all appointment api
export const getAllAppointmentAPI = async () => {
    return await commonAPI("GET", `${SERVER_URL}/all-appointment`, "")
}

// get user appointment api
export const getUserAppointmentAPI = async (reqHeader) => {
    return await commonAPI("GET", `${SERVER_URL}/user-appointment`, "", reqHeader)
}

// add doctor api
export const addDoctorAPI = async (reqBody, reqHeader) => {
    return await commonAPI("POST", `${SERVER_URL}/add-doctor`, reqBody, reqHeader)
}

// get all doctor api
export const getAllDoctorAPI = async (searchKey) => {
    return await commonAPI("GET", `${SERVER_URL}/all-doctor?search=${searchKey}`, "")
}

// edit doctor api
export const editDoctorAPI = async (doctorId, reqBody, reqHeader) => {
    return await commonAPI("PUT", `${SERVER_URL}/edit-doctor/${doctorId}`, reqBody, reqHeader)
}

// remove doctor api
export const removeDoctorAPI = async (doctorId, reqHeader) => {
    return await commonAPI("DELETE", `${SERVER_URL}/remove-doctor/${doctorId}`, {}, reqHeader)
}

// get doctor and department api
export const getDocAndDepAPI = async () => {
    return await commonAPI("GET", `${SERVER_URL}/doc-dep`, "")
}

// send message api
export const sendMessageAPI = async (reqBody) => {
    return await commonAPI("POST", `${SERVER_URL}/send-message`, reqBody)
}

// get all messages api
export const getAllMessageAPI = async (reqHeader) => {
    return await commonAPI("GET", `${SERVER_URL}/all-message`, "", reqHeader)
}

// delete message api
export const deleteMessageAPI = async (messageId, reqHeader) => {
    return await commonAPI("DELETE", `${SERVER_URL}/delete-message/${messageId}`, {}, reqHeader)
}