import React from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom'
import BookingHistory from './BookingHistory';
import Home from './Home';
import ServicesListComponent from './ServicesListComponent';

function MainComponent() {
    return (
        <div class="nav">
            <Router>
                <nav class="navbar">
                    <div class="logo">React Bus Services</div>
                    <ul class="nav-links">
                        <input type="checkbox" id="checkbox_toggle" />
                        <label for="checkbox_toggle" class="hamburger">&#9776;</label>
                        <div class="menu">
                            <li><NavLink className={({ isActive }) => (isActive ? 'linkactive' : 'link')} to='/' >Home</NavLink></li>
                            <li><NavLink className={({ isActive }) => (isActive ? 'linkactive' : 'link')} to='/booking' >Booking History</NavLink></li>
                        </div>
                    </ul>
                </nav>

                <Routes>
                    <Route path='/booking' element={<BookingHistory />} />
                    <Route path='/' element={<Home />} />
                    <Route path="/services/:serviceid"
                           element={<ServicesListComponent />} />
                </Routes>
            </Router>
        </div>
    );
}

export default MainComponent;