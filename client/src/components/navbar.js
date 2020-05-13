import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../style/navbar.css';
import { useState } from 'react';

function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <nav className="navbar">
            <div className={open ? "hamburger active icon" : "hamburger icon"} onClick={() => setOpen(!open)}>
                <div className="line"></div>
            </div>
            <div className="div-logo-navbar">
                <Link to="/" className="navbarLogo">ExerciseTracker</Link>
            </div>

            <ul className={open ? "nav-links open" : "nav-links"}>
                <li className={open ? "fade" : ""}>
                    <Link to="/">Exercices</Link>
                </li>
                <li className={open ? "fade" : ""}>
                    <Link to="/create">Créer un éxercice</Link>
                </li>
                <li className={open ? "fade" : ""}>
                    <Link to="/user">Créer un utilisateur</Link>
                </li>
            </ul>
        </nav >
    )
}


export default Navbar;