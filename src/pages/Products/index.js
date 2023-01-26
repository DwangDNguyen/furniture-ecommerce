/* eslint-disable jsx-a11y/anchor-is-valid */
import HeaderPath from '~/components/Layout/components/HeaderPath';
import classNames from 'classnames/bind';
import styles from './Products.module.scss';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Button from '~/components/Button';

import { FaSearch } from 'react-icons/fa';
import { TiTick } from 'react-icons/ti';
import Header from '~/components/Layout/components/Header';
import Footer from '~/components/Layout/components/Footer';

const api = 'https://course-api.com/react-store-products';

const cx = classNames.bind(styles);

const styleIconTick = { color: 'white' };

function Products() {
    const [productsData, setProductsData] = useState([]);
    const [categoryOptions, setCategoryOptions] = useState([]);
    const [priceScrollBarValue, setPriceScrollBarValue] = useState(Math.round((309999 / 100) * 100) / 100);
    const [changeDarkButton, setChangeDarkButton] = useState(true);
    const [changeLightButton, setChangeLightButton] = useState(false);
    const [underline, setUnderline] = useState('All');
    const [tickColor, setTickColor] = useState('All');
    const [companySelected, setCompanySelected] = useState('All');
    const [sort, setSort] = useState('');
    const [changePrice, setChangePrice] = useState(false);
    const [valueSearch, setValueSearch] = useState('');
    const [showSearchResult, setShowSearchResult] = useState(false);
    // const [newColor, setNewColor] = useState([]);
    const [filter, setFilter] = useState({});
    const [filterCate, setFilterCate] = useState([]);
    useEffect(() => {
        axios
            .get(api)
            .then((res) => {
                setCategoryOptions(res.data);
                setProductsData(res.data);
            })
            .catch((err) => console.log(err));
    }, []);
    const { category, company, colors } = categoryOptions;
    var cate = [];
    var comp = [];
    var listColor = [];
    categoryOptions.map((options) => {
        const { category, company, colors } = options;
        cate.push(category);
        comp.push(company);
        listColor.push(colors);
    });
    var newArrCate = [];
    var newArrComp = [];

    // console.log(newColor);
    for (var i = 0; i < cate.length; i++) {
        if (!newArrCate.includes(cate[i])) {
            newArrCate.push(cate[i]);
        }
    }
    newArrCate.splice(0, 0, 'All');

    for (var i = 0; i < comp.length; i++) {
        if (!newArrComp.includes(comp[i])) {
            newArrComp.push(comp[i]);
        }
    }
    newArrComp.splice(0, 0, 'All');

    const newColor = [];
    listColor.map((color) => newColor.push(...color));
    const colorsCate = [];
    for (var i = 0; i < newColor.length; i++) {
        if (!colorsCate.includes(newColor[i])) {
            colorsCate.push(newColor[i]);
        }
    }
    console.log(colorsCate);

    // search
    const handleChangeSearch = (e) => {
        setValueSearch(e.target.value);
    };
    useEffect(() => {
        setShowSearchResult(true);
        if (valueSearch === '') {
            setShowSearchResult(false);
        }
    }, [valueSearch, showSearchResult]);

    // filter
    const handleFilter = (e) => {
        const value = e.target.value;
        setFilter({
            ...filter,
            [e.target.name]: value,
        });
        if (e.target.name === 'category') {
            setUnderline(value);
        }
        if (e.target.name === 'colors') {
            setTickColor(value);
        }
        if (e.target.name === 'company') {
            setCompanySelected(value);
        }
        if (value === 'All' && e.target.name === 'category') {
            const { category, ...notCate } = filter;
            setFilter(notCate);
        }
        if (value === 'All' && e.target.name === 'company') {
            const { company, ...notCompany } = filter;
            setFilter(notCompany);
        }
        if (value === 'All' && e.target.name === 'colors') {
            const { colors, ...notColors } = filter;
            setFilter(notColors);
        }
        // if (e.target.name === 'price') {
        //     setPriceScrollBarValue(value);
        // }
    };

    useEffect(() => {
        if (underline === 'All') {
            setFilterCate(productsData);
        }

        setFilterCate(
            productsData
                .filter((item) => Math.round((item.price / 100) * 100) / 100 <= priceScrollBarValue)
                .filter((item) => Object.entries(filter).every(([key, value]) => item[key].includes(value))),
        );
    }, [underline, productsData, filter, priceScrollBarValue]);
    useEffect(() => {
        if (sort === 'price-highest') {
            setFilterCate((prev) => [...prev].sort((a, b) => b.price - a.price));
        } else if (sort === 'price-lowest') {
            setFilterCate((prev) => [...prev].sort((a, b) => a.price - b.price));
        } else if (sort === 'name-z') {
            setFilterCate((prev) => [...prev].sort((a, b) => b.name.localeCompare(a.name)));
        } else if (sort === 'name-a') {
            setFilterCate((prev) => [...prev].sort((a, b) => a.name.localeCompare(b.name)));
        }
    }, [sort]);
    console.log(productsData);

    const handlePriceScrollbar = (e) => {
        setPriceScrollBarValue(e.target.value);
    };

    const handleClickChangeDark = (e) => {
        setChangeDarkButton(true);
        setChangeLightButton(false);
    };
    const handleClickChangeLight = (e) => {
        setChangeDarkButton(false);
        setChangeLightButton(true);
    };

    const handleClickTickColor = (index) => {
        setTickColor(index);
    };

    console.log(filter);
    // console.log(productsData);

    const handleClearFilter = () => {
        setFilter({});
        setUnderline('All');
        setTickColor('All');
        setCompanySelected('All');
        setPriceScrollBarValue(Math.round((309999 / 100) * 100) / 100);
    };

    return (
        <>
            <Header />
            <HeaderPath text1="Products" />
            <div className={cx('products-page')}>
                <div className={cx('products-page-container')}>
                    <section className={cx('products-page-option')}>
                        <div className={cx('products-page-content')}>
                            <form>
                                <div className={cx('form-control')}>
                                    <input
                                        className={cx('search-input')}
                                        type="text"
                                        name="text"
                                        placeholder="search"
                                        value={valueSearch}
                                        onChange={handleChangeSearch}
                                    ></input>
                                </div>
                                <div className={cx('form-control')}>
                                    <h5>Category</h5>
                                    <div>
                                        {newArrCate.map((cate, index) => {
                                            return (
                                                <input
                                                    key={index}
                                                    type="button"
                                                    name="category"
                                                    value={cate}
                                                    onClick={handleFilter}
                                                    className={underline === cate ? cx('active') : cx('null')}
                                                />
                                            );
                                        })}
                                    </div>
                                </div>
                                <div className={cx('form-control')}>
                                    <h5>Company</h5>
                                    <div>
                                        {newArrComp.map((comp, index) => {
                                            return (
                                                <input
                                                    key={index}
                                                    type="button"
                                                    name="company"
                                                    value={comp}
                                                    onClick={handleFilter}
                                                    className={
                                                        companySelected === comp ? cx('active-company') : cx('null')
                                                    }
                                                />
                                            );
                                        })}
                                    </div>
                                </div>
                                <div className={cx('form-control')}>
                                    <h5>Colors</h5>
                                    <div className={cx('colors')}>
                                        <Button
                                            name="colors"
                                            className={
                                                tickColor === 'All' ? cx('all-btn', 'active-color') : cx('all-btn')
                                            }
                                            data-color="all"
                                            value="All"
                                            onClick={handleFilter}
                                        >
                                            All
                                        </Button>
                                        {colorsCate.map((colorName, index) => {
                                            return (
                                                <input
                                                    key={index}
                                                    type="button"
                                                    name="colors"
                                                    value={colorName}
                                                    onClick={handleFilter}
                                                    className={
                                                        tickColor === colorName
                                                            ? cx('color-btn', 'active-color')
                                                            : cx('color-btn')
                                                    }
                                                />
                                            );
                                        })}
                                    </div>
                                </div>
                                <div className={cx('form-control')}>
                                    <h5>Price</h5>
                                    <p className={cx('price')}>${priceScrollBarValue}</p>
                                    <input
                                        className={cx('price-scrollbar')}
                                        type="range"
                                        name="price"
                                        min="0"
                                        max={Math.round((309999 / 100) * 100) / 100}
                                        step="0.01"
                                        value={priceScrollBarValue}
                                        onChange={handlePriceScrollbar}
                                    ></input>
                                </div>
                                {/* <div className={cx('form-control')}>
                                    <div className={cx('shipping-container')}>
                                        <label htmlFor="shipping">free shipping</label>
                                        <input type="checkbox" name="shipping" id="shipping"></input>
                                    </div>
                                </div> */}
                            </form>
                            <Button className={cx('clear-btn')} onClick={() => handleClearFilter()}>
                                Clear Filters
                            </Button>
                        </div>
                    </section>
                    <section className={cx('product-page-products')}>
                        <section className={cx('product-page-header')}>
                            <div className={cx('btn-container')}>
                                <button
                                    onClick={handleClickChangeDark}
                                    className={changeDarkButton ? cx('option-display-active') : ''}
                                >
                                    <svg
                                        stroke="currentColor"
                                        fill="currentColor"
                                        strokeWidth="0"
                                        viewBox="0 0 16 16"
                                        height="1em"
                                        width="1em"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M1 2.5A1.5 1.5 0 012.5 1h3A1.5 1.5 0 017 2.5v3A1.5 1.5 0 015.5 7h-3A1.5 1.5 0 011 5.5v-3zm8 0A1.5 1.5 0 0110.5 1h3A1.5 1.5 0 0115 2.5v3A1.5 1.5 0 0113.5 7h-3A1.5 1.5 0 019 5.5v-3zm-8 8A1.5 1.5 0 012.5 9h3A1.5 1.5 0 017 10.5v3A1.5 1.5 0 015.5 15h-3A1.5 1.5 0 011 13.5v-3zm8 0A1.5 1.5 0 0110.5 9h3a1.5 1.5 0 011.5 1.5v3a1.5 1.5 0 01-1.5 1.5h-3A1.5 1.5 0 019 13.5v-3z"
                                            clipRule="evenodd"
                                        ></path>
                                    </svg>
                                </button>
                                <button
                                    onClick={handleClickChangeLight}
                                    className={changeLightButton ? cx('option-display-active') : ''}
                                >
                                    {/* className={cx('option-display-active')} */}
                                    <svg
                                        stroke="currentColor"
                                        fill="currentColor"
                                        strokeWidth="0"
                                        viewBox="0 0 16 16"
                                        height="1em"
                                        width="1em"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M2.5 11.5A.5.5 0 013 11h10a.5.5 0 010 1H3a.5.5 0 01-.5-.5zm0-4A.5.5 0 013 7h10a.5.5 0 010 1H3a.5.5 0 01-.5-.5zm0-4A.5.5 0 013 3h10a.5.5 0 010 1H3a.5.5 0 01-.5-.5z"
                                            clipRule="evenodd"
                                        ></path>
                                    </svg>
                                </button>
                            </div>
                            <p>List Products</p>
                            <hr></hr>
                            <form>
                                <label htmlFor="sort">Sort By</label>
                                <select
                                    name="sort"
                                    id="sort"
                                    className={cx('sort-input')}
                                    onChange={(e) => setSort(e.target.value)}
                                >
                                    <option value="price-lowest">price (lowest)</option>
                                    <option value="price-highest">price (highest)</option>
                                    <option value="name-a">name (a - z)</option>
                                    <option value="name-z">name (z - a)</option>
                                </select>
                            </form>
                        </section>
                        <section className={cx('product-page-container')}>
                            <div
                                className={
                                    changeLightButton ? cx('products-container-column') : cx('products-container')
                                }
                            >
                                {filterCate
                                    .filter((item) => item.name.toLowerCase().includes(valueSearch))
                                    .map((products, index) => {
                                        return (
                                            <article
                                                key={index}
                                                className={
                                                    changeDarkButton ? cx('products-list') : cx('products-list-column')
                                                }
                                            >
                                                <div className={cx('products-list-product')}>
                                                    <img
                                                        className={
                                                            changeDarkButton
                                                                ? cx('products-detail-img')
                                                                : cx('products-detail-column')
                                                        }
                                                        src={products.image}
                                                        alt={products.name}
                                                    ></img>
                                                    <a
                                                        className={changeDarkButton ? '' : cx('products-detail-search')}
                                                        href={`/products/${products.id}`}
                                                    >
                                                        <FaSearch className={cx('detail')} />
                                                    </a>
                                                </div>
                                                {changeDarkButton ? (
                                                    <footer>
                                                        <h5>{products.name}</h5>
                                                        <p>${Math.round((products.price / 100) * 100) / 100}</p>
                                                    </footer>
                                                ) : (
                                                    <div className={cx('products-list-detail')}>
                                                        <h4>{products.name}</h4>
                                                        <h5>${Math.round((products.price / 100) * 100) / 100}</h5>
                                                        <p>{products.description}</p>
                                                        <Button
                                                            className={cx('btn-detail')}
                                                            href={`/products/${products.id}`}
                                                        >
                                                            DETAILS
                                                        </Button>
                                                    </div>
                                                )}
                                            </article>
                                        );
                                    })}
                            </div>
                        </section>
                    </section>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Products;
