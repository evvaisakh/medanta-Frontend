import React, { useEffect } from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';
import Marquee from "react-fast-marquee";
import department1 from '../assets/department1.jpg'
import department2 from '../assets/department2.jpg'
import department3 from '../assets/department3.jpg'
import department4 from '../assets/department4.jpg'
import department5 from '../assets/department5.jpg'
import { Container } from 'react-bootstrap'
import '../Department.css';

function Departments() {

    const cards = [
        {
            name: 'General Surgery',
            details: 'General Surgery is mainly focused on the abdominal organs, breast, thyroid gland and hernias. Operations of the esophagus, stomach, colon, liver, gallbladder, bile duct are done with key-hole technology (Laparoscopically). The overall responsibility for trauma care also comes under the realm of general surgery.',
            image: department1
        },
        {
            name: 'ENT',
            details: 'The surgical specialty concerned with the diagnosis and treatment of ear, nose, throat, head and neck disorders is Otolaryngology-head and neck surgery, commonly known as ENT. The parts covered under this specialty includes ears, nose and nasal passage, sinuses, larynx (voice box), oral cavity and upper pharynx (mouth and throat), as well as structures of the neck and face.',
            image: department2
        },
        {
            name: 'Obstetrics & Gynaecology',
            details: 'Equipped with the advanced MGM German laparoscopic system and operation theatres of international standard, we hold the cutting edge in minimally invasive surgery and other surgical procedures.',
            image: department3
        },

        {
            name: 'Orthopaedics',
            details: 'Orthopaedics is a branch of medicine which deals with treatment of various diseases of musculoskeletal system right from birth deformities to fracture, spine disorders, arthritis, sports injury and malignancies of bone.',
            image: department4
        },
        {
            name: 'Peadiatrics & Neonatology',
            details: 'Medical care for children is always a sensitive issue. We ensures that this is kept in mind at all times so that young patient receives the best treatment and care for his special and emotional needs. The 24 hour pediatric emergency room forms an important part of this department.',
            image: department5
        }
    ]

    useEffect(() => {
        AOS.init({
            duration: 1200,
        });
    }, [])

    return (
        <>
            <Container className="departments-wrapper">
                <Marquee speed={50} gradient={false} pauseOnHover={true} direction="left">
                    {cards?.length > 0 &&
                        cards?.map((card, index) => (
                            <div className="department-card-container" key={index} data-aos="fade-up">
                                <div className="department-card">
                                    <div className="card-front">
                                        <h5 className="card-title fw-bold text-center">{card?.name}</h5>
                                        <img className="department-image" src={card?.image} alt={`${card?.name} Image`} />
                                    </div>
                                    <div className="card-back">
                                        <h5 className="card-title fw-bold text-center">{card?.name}</h5>
                                        <p className="card-details fw-bold">{card?.details}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </Marquee>
            </Container>
        </>
    )
}

export default Departments
