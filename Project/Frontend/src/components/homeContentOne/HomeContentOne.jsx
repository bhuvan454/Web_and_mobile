import React from 'react';
import './homeContentOne.css';

const HomeContentOne = () => {

    return (
        <div className="HomeContentOneContainer">
            <div className="HomeContentOneContainerTitle">
                <h2>Does new appeal to you? We’re proud to present</h2>
            </div>
            <div className="HomeContentOneContainerContent">
                <div>
                <div className="content1image"></div>
                <h4>Kansas city</h4>
                </div>
                <div>
                <div className="content2image"></div>
                <h4>Kansas city</h4>
                </div>
                <div>
                <div className="content3image"></div>
                <h4>Kansas city</h4>
                </div>
                {/* <div className="content2image"></div> */}
                {/* <div className="content3image"></div> */}
            </div>
        </div>
    )
}

export default HomeContentOne;