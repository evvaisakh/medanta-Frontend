import React from 'react'
import { Container } from 'react-bootstrap'

function TinyFooter() {
    return (
        <>
            <Container fluid className="text-center bg-dark text-light py-2">
                <p className='mb-0'>Copyright&copy; 2024 Medanta. Built with React.</p>
            </Container>
        </>
    )
}

export default TinyFooter