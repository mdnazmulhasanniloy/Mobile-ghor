import React from 'react';

const Carousel = () => {
    return (
        <div className="carousel w-full my-10">
            <div id="slide1" className="carousel-item relative w-full">
                <img src="https://i02.appmifile.com/454_operator_global/23/11/2022/9270707f46e04e503963a14119a3d308.jpg?f=webp" className="w-full" alt='...' />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide3" className="btn btn-circle">❮</a>
                    <a href="#slide2" className="btn btn-circle">❯</a>
                </div>
            </div>
            <div id="slide2" className="carousel-item relative w-full">
                <img src="https://image01.realme.net/general/20221108/1667889181265.jpg.webp" className="w-full" alt='...' />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide1" className="btn btn-circle">❮</a>
                    <a href="#slide3" className="btn btn-circle">❯</a>
                </div>
            </div>
            <div id="slide3" className="carousel-item relative w-full">
                <img src="https://image01.realme.net/general/20220915/1663213014772.png.webp" className="w-full" alt='...' />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide2" className="btn btn-circle">❮</a>
                    <a href="#slide1" className="btn btn-circle">❯</a>
                </div>
            </div>
        </div>
    );
};

export default Carousel;