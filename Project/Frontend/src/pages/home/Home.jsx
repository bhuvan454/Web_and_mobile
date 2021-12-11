import React, { useState, useEffect } from 'react';
import Footer from '../../components/footer/Footer';
import HomeContentOne from '../../components/homeContentOne/HomeContentOne';
import HomeContentTwo from '../../components/homeContentTwo/HomeContentTwo';
import HomeSearch from '../../components/homeSearch/HomeSearch';
import TopBar from '../../components/topbar/TopBar';

const Home = () => {

    return (
        <>
            <TopBar />
            <HomeSearch />
            <HomeContentOne />
            <HomeContentTwo />
            <Footer />
        </>
    )
}

export default Home;