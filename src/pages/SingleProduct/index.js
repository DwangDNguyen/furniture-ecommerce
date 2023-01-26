import HeaderPath from '~/components/Layout/components/HeaderPath';
import classNames from 'classnames/bind';
import styles from './SingleProduct.module.scss';

import Button from '~/components/Button';
import Star from '~/components/Layout/components/Star';

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import MainImg from '../../components/assets/image/hero-bcg-1.jpeg';
import { useDispatch } from 'react-redux';
import { addProduct } from '~/redux/cartRedux';
import Header from '~/components/Layout/components/Header';
import Footer from '~/components/Layout/components/Footer';

const cx = classNames.bind(styles);

const apiListProduct = 'https://course-api.com/react-store-products';

function SingleProduct() {
    const [detailProduct, setDetailProduct] = useState([]);
    const [products, setProducts] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [color, setColor] = useState(0);
    const { images, stars, colors } = detailProduct;
    const { productId } = useParams();

    const dispatch = useDispatch();

    // useEffect(() => {
    //     axios
    //         .get(apiListProduct)
    //         .then((res) => {
    //             setProducts(res.data);
    //         })
    //         .catch((err) => console.log(err));
    // }, []);
    // const thisProductId = products.find((product) => product.id === productId);
    // console.log(thisProductId);

    const [urlImg, setUrlImg] = useState();

    useEffect(() => {
        axios
            .get(`https://course-api.com/react-store-single-product?id=${productId}`)
            .then((res) => {
                setDetailProduct(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    // slide
    const [current, setCurrent] = useState(0);
    const length = images?.length;

    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1);
    };

    const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1);
    };

    if (!Array.isArray(images) || images.length <= 0) {
        return null;
    }
    // quantity
    const handleChangeQuantity = (change) => {
        if (change === 'decr') {
            quantity > 1 ? setQuantity(quantity - 1) : setQuantity(1);
        } else {
            quantity < detailProduct.stock ? setQuantity(quantity + 1) : setQuantity(detailProduct.stock);
        }
    };

    const handleClick = () => {
        color === 0 ? alert('Please Select a Color!!') : dispatch(addProduct({ ...detailProduct, quantity, color }));
        console.log({ ...detailProduct, quantity, color });
    };
    return (
        <>
            <Header />
            <HeaderPath text1="Products / " text2={detailProduct.name} />
            <div className={cx('single-product')}>
                <div className={cx('single-product-container')}>
                    <Button to="/products" primary className={cx('back-btn')}>
                        back to products
                    </Button>
                    <div className={cx('single-product-center')}>
                        <section className={cx('single-product-img')}>
                            <div className={cx('mainImgPro')}>
                                {images?.map((img, index) => {
                                    return (
                                        <div className={index === current ? cx('slide-active') : cx('img-slide')}>
                                            {index === current && (
                                                <img src={img.url} key={index} className={cx('mainImg')} />
                                            )}
                                        </div>
                                    );
                                })}
                                <div className={cx('left')} onClick={prevSlide}>
                                    <AiOutlineLeft />
                                </div>
                                <div className={cx('right')} onClick={nextSlide}>
                                    <AiOutlineRight />
                                </div>
                            </div>
                            {/* <div className={cx('single-product-gallery')}>
                                {images?.map((img, index) => {
                                    return (
                                        <img
                                            src={img.url}
                                            key={index}
                                            className={cx('img-list', 'active-img')}
                                            onClick={() => setUrlImg(img.url)}
                                        />
                                    );
                                })}

                                
                            </div> */}
                        </section>
                        <section className={cx('single-product-content')}>
                            <h2>{detailProduct.name}</h2>
                            <div className={cx('single-product-review')}>
                                <div className={cx('single-product-star')}>
                                    <Star stars={stars} />
                                </div>
                                <p className={cx('single-product-amount-review')}>
                                    ({detailProduct.reviews} customer reviews)
                                </p>
                            </div>
                            <h5 className={cx('single-product-price')}>
                                ${Math.round((detailProduct.price / 100) * 100) / 100}
                            </h5>
                            <p className={cx('single-product-desc')}>{detailProduct.description}</p>
                            <p className={cx('single-product-info')}>
                                <span>Available: </span> {detailProduct.stock > 0 ? 'In Stock' : 'Out of Stock'}
                            </p>
                            <p className={cx('single-product-info')}>
                                <span>SKU: </span>
                                {detailProduct.id}
                            </p>
                            <p className={cx('single-product-info')}>
                                <span>Brand: </span> {detailProduct.company}
                            </p>
                            <hr></hr>
                            {detailProduct.stock > 0 ? (
                                <section className={cx('single-product-cate-option')}>
                                    <div className={cx('single-product-colors')}>
                                        <span>Colors: </span>
                                        <div>
                                            {colors?.map((colors, index) => {
                                                return (
                                                    <input
                                                        type="button"
                                                        style={{ backgroundColor: `${colors}` }}
                                                        name="colors"
                                                        value={colors}
                                                        className={
                                                            color === colors
                                                                ? cx('colors-option', 'active-color')
                                                                : cx('colors-option')
                                                        }
                                                        onClick={() => setColor(colors)}
                                                    />
                                                );
                                            })}
                                        </div>
                                    </div>
                                    <div className={cx('btn-controll')}>
                                        <div className={cx('controll-amount')}>
                                            <button
                                                className={cx('amount-btn', 'decr')}
                                                onClick={() => handleChangeQuantity('decr')}
                                            >
                                                <svg
                                                    stroke="currentColor"
                                                    fill="currentColor"
                                                    strokeWidth="0"
                                                    viewBox="0 0 448 512"
                                                    height="1em"
                                                    width="1em"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path>
                                                </svg>
                                            </button>
                                            <h2 className={cx('amount')}>{quantity}</h2>
                                            <button
                                                className={cx('amount-btn', 'incr')}
                                                onClick={() => handleChangeQuantity('incr')}
                                            >
                                                <svg
                                                    stroke="currentColor"
                                                    fill="currentColor"
                                                    strokeWidth="0"
                                                    viewBox="0 0 448 512"
                                                    height="1em"
                                                    width="1em"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path>
                                                </svg>
                                            </button>
                                        </div>
                                        <Button
                                            primary
                                            href={color === 0 ? '' : '/cart'}
                                            className={cx('btn-add-to-cart')}
                                            onClick={() => handleClick()}
                                        >
                                            Add to Cart
                                        </Button>
                                    </div>
                                </section>
                            ) : (
                                ``
                            )}
                        </section>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default SingleProduct;
