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
                <Card className='custom_card' style={{ width: '21rem'}}>
                    <Card.Img variant="top" src='https://i.ibb.co/TTZrsLJ/iamge1.png' />
                    <Card.Body className='card_Body'>
                        <div className='d-flex align-items-center'>
                            <img  src="https://i.ibb.co/48jGMhK/Group-204.png" alt=""/>
                            <h5 className='mb-0 ml-2'>Fast Delivery</h5>
                        </div>
                        <div className='card_b_text'>
                            <Card.Text className='card_p'>
                            Some quick example text to build on the card title and make up the bulk of
                            the card's content.
                            <p className="collapse" id="collapseExample1">
                                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
                            </p>
                            </Card.Text>
                            <span className='see_moreBtn' data-toggle="collapse" data-target="#collapseExample1" aria-expanded="false" aria-controls="collapseExample1">See more <FontAwesomeIcon className='right_arrow' icon={faArrowCircleRight} /></span>
                       </div>
                    </Card.Body>
                </Card>

                <Card className='custom_card' style={{ width: '21rem'}}>
                    <Card.Img variant="top" src='https://i.ibb.co/m4mvSQK/image2.png' />
                    <Card.Body className='card_Body'>
                        <div className='d-flex align-items-center'>
                            <img  src="https://i.ibb.co/Krndkz0/Group-1133.png" alt=""/>
                            <h5 className='mb-0 ml-2'>A Good Auto Responder</h5>
                        </div>
                        <div className='card_b_text'>
                            <Card.Text className='card_p'>
                            Some quick example text to build on the card title and make up the bulk of
                            the card's content.
                            <p className="collapse" id="collapseExample2">
                                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
                            </p>
                            </Card.Text>
                            <span className='see_moreBtn' data-toggle="collapse" data-target="#collapseExample2" aria-expanded="false" aria-controls="collapseExample2">See more <FontAwesomeIcon className='right_arrow' icon={faArrowCircleRight} /></span>
                       </div>
                    </Card.Body>
                </Card> 

                <Card className='custom_card' style={{ width: '21rem'}}>
                    <Card.Img variant="top" src='https://i.ibb.co/ByPDfBQ/image3.png' />
                    <Card.Body className='card_Body'>
                        <div className='d-flex align-items-center'>
                            <img  src="https://i.ibb.co/tMnm9qm/Group-245.png" alt=""/>
                            <h5 className='mb-0 ml-2'>Home Delivery</h5>
                        </div>
                        <div className='card_b_text'>
                            <Card.Text className='card_p'>
                            Some quick example text to build on the card title and make up the bulk of
                            the card's content.
                            <p className="collapse" id="collapseExample">
                                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
                            </p>
                            </Card.Text>
                            <span className='see_moreBtn' data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">See more <FontAwesomeIcon className='right_arrow' icon={faArrowCircleRight} /></span>
                       </div>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
};

export default Blog;