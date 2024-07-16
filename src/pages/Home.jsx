import React from 'react'
import Header from '../components/Header'
import HomeDiv from '../components/HomeDiv'
import CircleCarousel from '../components/CircleCarousel'
import Footer from '../components/Footer'

function Home() {
    return (
        <>
            <Header />
            <CircleCarousel />
            <HomeDiv />
            <Footer />
        </>
    )
}

export default Home