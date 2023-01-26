/* eslint-disable jsx-a11y/alt-text */
import classNames from 'classnames/bind';
import styles from './Home.module.scss';

import Footer from '~/components/Layout/components/Footer';
import Header from '~/components/Layout/components/Header';

import Button from '~/components/Button';
import SliderFeatureProducts from '~/components/Layout/components/SliderFeatureProducts';

import { MissionIcon, VisionIcon, HistoryIcon } from '~/components/Layout/components/Icons';
import MainImg from '../../components/assets/image/hero-bcg-1.jpeg';
import SecondImg from '../../components/assets/image/hero-bcg-2.jpeg';
const cx = classNames.bind(styles);

const service = [
    {
        icon: <MissionIcon />,
        title: 'Mission',
        desc: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates, ea. Perferendis corrupti reiciendis nesciunt rerum velit autem unde numquam nisi',
    },
    {
        icon: <VisionIcon />,
        title: 'Vision',
        desc: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates, ea. Perferendis corrupti reiciendis nesciunt rerum velit autem unde numquam nisi',
    },
    {
        icon: <HistoryIcon />,
        title: 'History',
        desc: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates, ea. Perferendis corrupti reiciendis nesciunt rerum velit autem unde numquam nisi',
    },
];

function Home() {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                {/* Home Intro */}
                <section className={cx('home-intro')}>
                    <article className={cx('content')}>
                        <h1>
                            Design Your <br></br>Comfort Zone
                        </h1>
                        <p>
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto, at sed omnis corporis
                            doloremque possimus velit! Repudiandae nisi odit, aperiam odio ducimus, obcaecati libero et
                            quia tempora excepturi quis alias?
                        </p>
                        <Button primary href="/products">
                            SHOP NOW
                        </Button>
                    </article>
                    <article className={cx('img-container')}>
                        <img src={MainImg} className={cx('main-img')} />
                        <img src={SecondImg} className={cx('secondary-img')} />
                    </article>
                </section>

                {/* Featured */}
                <section className={cx('home-products')}>
                    <div className={cx('title')}>
                        <h2>Featured Products</h2>
                        <div className={cx('underline')}></div>
                    </div>
                    <SliderFeatureProducts />
                    <Button primary className={cx('btn-more')} href="/products">
                        ALL PRODUCTS
                    </Button>
                </section>

                <section className={cx('custom')}>
                    <section className={cx('custom-container')}>
                        <article className={cx('header')}>
                            <h3>
                                Custom Furniture <br></br> Built Only For You
                            </h3>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe dolorum debitis
                                consectetur reprehenderit non aliquam voluptates dolore aut vero consequuntur.
                            </p>
                        </article>
                        <div className={cx('services-center')}>
                            {service.map((item, index) => {
                                const { icon, title, desc } = item;
                                return (
                                    <article className={cx('service')} key={index}>
                                        <span className={cx('icon')}>{icon}</span>
                                        <h4>{title}</h4>
                                        <p>{desc}</p>
                                    </article>
                                );
                            })}
                        </div>
                    </section>
                </section>
                <section className={cx('newsletter-discount')}>
                    <div className={cx('newsletter-discount-container')}>
                        <h3>Join our newsletter and get 20% off</h3>
                        <div className={cx('newsletter-discount-content')}>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat sint unde quaerat
                                ratione soluta veniam provident adipisci cumque eveniet tempore?
                            </p>
                            <form className={cx('contact-form')}>
                                <input type="email" className={cx('form-input')} placeholder="enter email"></input>
                                <Button primary type="submit" className={cx('submit-btn')}>
                                    subscribe
                                </Button>
                            </form>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    );
}

export default Home;
