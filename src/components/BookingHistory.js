import React, { useEffect, useState } from 'react';

function BookingHistory(props) {

    const [bookings, setBookings] = useState(null);
   



    useEffect(() => {
        fetch('http://localhost:3000/bookings', {
            method: "Get"
        }).then((response) =>
            response.json().then((result) => {
                if (result.length > 0) {
                    setBookings(result)
                }else{
                    setBookings(null)
                }
            }))
    }, [])

    return (
        <div>
            {
                bookings ?
                    <div class="flex-container">
                        {
                            bookings.map((item, i) =>

                                <div class="booking-card">
                                    <div >
                                        <div style={{ color: 'black', fontWeight: 'bold' }}><span>{item.booking_from}</span><span>-</span><span>{item.booking_to}</span></div>

                                        <div class="subtitle"><span>Name: </span><span>{item.bookingname}</span></div>
                                        <div class="subtitle"><span>Type: </span><span>{item.booking_type}</span></div>
                                        <div class="subtitle"><span>No of Tickets: </span><span>{item.no_of_tickets}</span></div>
                                        <div class="subtitle"><span>Seats: </span><span>{item.booking_seats}</span></div>
                                        <div class="subtitle"><span>Total Amount: </span><span>{item.total_amount}{" "}₹</span></div>
                                        <div class="subtitle"><span>Date: </span><span>{new Date(Date.parse(item.date)).toLocaleDateString(
              "en-us",
              {
                weekday: "long",
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
              }
            )}</span></div>
                                    </div>

                                </div>


                            )
                        }
                    </div> : <h2>No Data Found.</h2>
            }
        </div>
    );
}

export default BookingHistory;