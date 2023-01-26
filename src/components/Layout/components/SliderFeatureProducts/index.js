import React from 'react';
import { useState, useEffect } from 'react';
import Slider from 'react-slick';
import axios from 'axios';

import classNames from 'classnames/bind';
import styles from './SliderFeatureProducts.module.scss';
import { FaSearch } from 'react-icons/fa';
const cx = classNames.bind(styles);

const API_URL = 'https://course-api.com/react-store-products';

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return <div className={className} style={{ ...style, display: 'none' }} onClick={onClick} />;
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return <div className={className} style={{ ...style, display: 'none' }} onClick={onClick} />;
}

function SliderFeatureProducts(items) {
    const [data, setData] = useState([]);
    const settings = {
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 2,
        speed: 2000,
        autoplay: true,
        autoplaySpeed: 5000,
        cssEase: 'linear',
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
    };

    useEffect(() => {
        axios
            .get(API_URL)
            .then((res) => {
                setData(res.data);
            })
            .catch((error) => console.log(error));
    }, []);

    return (
        <div className={cx('featured')}>
            <Slider {...settings}>
                {data.map((product, index) => {
                    const { name, price, image } = product;
                    return (
                        <article key={index}>
                            <div className={cx('container')}>
                                <img src={image} alt={name} />
                                <a href="#">
                                    <FaSearch className={cx('detail')} />
                                </a>
                            </div>
                            <div className={cx('footer-featured')}>
                                <h5>{name}</h5>
                                <p>${price / 100}</p>
                            </div>
                        </article>
                    );
                })}
            </Slider>
        </div>
    );
}

export default SliderFeatureProducts;
