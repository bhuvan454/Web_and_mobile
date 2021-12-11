import React, { useEffect, useState } from 'react';
import './topbar.css';

const TopBar = () => {

    return (    
        <>
            <div className="topbarContainer">
                <div className="topbarLeft">
                    <h2>Property and Rent</h2>
                </div>
                <div className="topbarRight">
                     <ul>
                         <li>Home</li>
                         <li>About</li>
                         <li>Services</li>
                         <li>Contact</li>
                     </ul>   
                </div>
            </div>
        </>
    )
}

export default TopBar;