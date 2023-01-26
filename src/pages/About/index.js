import HeaderPath from '~/components/Layout/components/HeaderPath';
import classNames from 'classnames/bind';
import styles from './About.module.scss';

import AboutImg from '../../components/assets/image/hero-bcg-1.jpeg';
import Header from '~/components/Layout/components/Header';
import Footer from '~/components/Layout/components/Footer';

const cx = classNames.bind(styles);

function About() {
    return (
        <>
            <Header />
            <HeaderPath text1="About" />
            <div className={cx('about')}>
                <div className={cx('about-container')}>
                    <img src={AboutImg} alt="aboutImage" />
                    <div className={cx('about-content')}>
                        <div className={cx('about-title')}>
                            <h2>Our Story</h2>
                            <div></div>
                        </div>
                        <p>
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat accusantium sapiente
                            tempora sed dolore esse deserunt eaque excepturi, delectus error accusamus vel eligendi,
                            omnis beatae. Quisquam, dicta. Eos quod quisquam esse recusandae vitae neque dolore,
                            obcaecati incidunt sequi blanditiis est exercitationem molestiae delectus saepe odio
                            eligendi modi porro eaque in libero minus unde sapiente consectetur architecto. Ullam rerum,
                            nemo iste ex, eaque perspiciatis nisi, eum totam velit saepe sed quos similique amet. Ex,
                            voluptate accusamus nesciunt totam vitae esse iste.
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default About;
