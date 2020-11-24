import React from 'react';
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';
import './Blog.css'


const Blog = () => {
    return (
        <div className='container blog'>
            <h2>Why you Choose us</h2>
            <p className='p-text'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. <br/>
                Necessitatibus recusandae natus minus sequi distinctio ratione nobis animi est.
            </p>
            <div className='card_container'>
                <Card className='custom_card' style={{ width: '21rem' }}>
                    <Card.Img variant="top" src='https://i.ibb.co/TTZrsLJ/iamge1.png' />
                    <Card.Body className='card_Body d-flex justify-content-between'>
                        <div>
                            <img src="https://i.ibb.co/48jGMhK/Group-204.png" alt=""/>
                        </div>
                        <div className='card_b_text'>
                            <Card.Title>Fast Delivery</Card.Title>
                            <Card.Text className='card_p'>
                            Some quick example text to build on the card title and make up the bulk of
                            the card's content.
                            </Card.Text>
                            <a href="#">See more <FontAwesomeIcon className='right_arrow' icon={faArrowCircleRight} /></a>
                        </div>
                    </Card.Body>
                </Card>

                <Card className='custom_card' style={{ width: '21rem' }}>
                    <Card.Img variant="top" src='https://i.ibb.co/m4mvSQK/image2.png' />
                    <Card.Body className='card_Body d-flex justify-content-between'>
                        <div>
                            <img src='https://i.ibb.co/Krndkz0/Group-1133.png' alt=""/>
                        </div>
                        <div className='card_b_text'>
                            <Card.Title>A Good Auto Responder</Card.Title>
                            <Card.Text className='card_p'>
                            Some quick example text to build on the card title and make up the bulk of
                            the card's content.
                            </Card.Text>
                            <a href="#">See more <FontAwesomeIcon className='right_arrow' icon={faArrowCircleRight} /></a>
                        </div>
                    </Card.Body>
                </Card>

                <Card className='custom_card' style={{ width: '21rem' }}>
                    <Card.Img variant="top" src='https://i.ibb.co/ByPDfBQ/image3.png' />
                    <Card.Body className='card_Body d-flex justify-content-between'>
                        <div>
                            <img src="https://i.ibb.co/tMnm9qm/Group-245.png" alt=""/>
                        </div>
                       <div className='card_b_text'>
                        <Card.Title>Home Delivery</Card.Title>
                            <Card.Text className='card_p'>
                            Some quick example text to build on the card title and make up the bulk of
                            the card's content.
                            </Card.Text>
                            <a href="#">See more <FontAwesomeIcon className='right_arrow' icon={faArrowCircleRight} /></a>
                       </div>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
};

export default Blog;