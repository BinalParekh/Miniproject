import React, { useState, useEffect } from 'react';
function TicketBookDetails({ data }) {

  console.log(data)
  const [name, setName] = useState(null);
  const [ticket, setTicket] = useState(0);
  const [seatNumber, setSeatNumbers] = useState(null);
  const [available_seats, setAvalibleseat] = useState(null);
  const [nameError, setNameError] = useState(null);
  const [ticketError, setTicketError] = useState(null);






  useEffect(() => {
    selectedSeats(ticket);
  }, [ticket, data]);


  function handleBooking(name, seatNumber, ticket, data, amount) {
    

    if(name==null){
    setNameError("This field is required.")
    }else if(ticket==0){
      setTicketError("This field is required.")
    }else if(ticket>data.available_seats){
      setTicketError("you can not select more than"+data.available_seats)
    }else{
      setAvalibleseat(data.available_seats-ticket);
      const payload = {
        "route_id": data.route_id,
        "bookingname": name,
        "booking_from": data.from,
        "booking_to": data.to,
        "booking_type": data.type,
        "booking_seats": seatNumber,
        "no_of_tickets": ticket,
        "total_amount": amount,
        "date":data.departure_time
      }
      console.log(payload);
     //add data into bookings
      fetch('http://localhost:3000/bookings', {
        method: 'POST',
        headers: { 'content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).then((response) =>
        response.json().then((result) =>
          alert('Booking Confirmed.'),
          ClearFields()
        ))
  
        //update avalible seats
      //   const payload={
      //     "available_seats":available_seats,
      //     "email":email,
      //     "address":address,
      //     "rating":rating
      // }
      // console.log(payload);
      // fetch('http://localhost:3000/service_providers/'+data.route_id, {
      //     method: 'PUT',
      //     headers: {'content-Type':'application/json'},
      //     body: JSON.stringify(payload)
      // }).then((response)=>
      //  response.json().then((result) =>
      //         alert('Restaurant has been updated.')
      //     ))
  

    }

   
  }

  function ClearFields() {

    document.getElementById("fname").value = "";
    document.getElementById("fticket").value = 0;
}


  // 5 % of the fare
  const getGst = (fare) => {
    return fare * 0.08;
  };

  // 1% of the fare
  const getRoadTax = (fare) => {
    return fare * 0.01;
  };

  // 2% of the fare
  const getServiceTax = (fare) => {
    return fare * 0.02;
  };

  const getAmont = () => {
    return getGst(ticket * data.Fare) +
      getServiceTax(ticket * data.Fare) +
      getRoadTax(ticket * data.Fare) +
      ticket * data.Fare;
  }

  const selectedSeats = (seats) => {
    let text = "";
    const from = data.total_seats - data.available_seats;
    const to = from + +seats;
    console.log("from", from, "to", to, "seats", seats);
    if (to > data.total_seats) {
      text = "Bus completely booked.";
    } else {
      for (let s = from; s < to; s++) {
        text += "S" + (+s + 1) + " ";
      }
    }

    setSeatNumbers(text);
  };

  function ticketfunction (event) {
    setTicket(event.target.value)
    setTicketError(null)
  }

  function namefunction (event) {
    setName(event.target.value)
    setNameError(null)
  }


  return (
    <div class="bookingDetails">
      <div class="bookingrow">
        <div class="colomn">
          <div style={{ textAlign: 'start', marginLeft: '10px' }}>Booking</div>
          <div style={{ marginTop: '10px' }}>
            <div class="textinput"><label for="fname">First Name:</label></div>
            <div class="textinput"><input type="text" id="fname" name="fname" onChange={(event) => { namefunction(event) }} /></div>
            <p style={{color: "red",fontSize:"10px",textAlign:"start",marginLeft: '10px' }}>{nameError}</p>
          </div>
          
          <div style={{ textAlign: 'start', margin: '20px 10px' }}>Details</div>
          <div class="text-details">
            <div>{name}</div>
            <div><span>Ticket Selected:</span><span>{ticket}</span></div>
            <div><span>Seat#:</span><span>{seatNumber}</span></div>
            <div style={{ margin: '10px 0px' }}>
              <div><span>From:</span><span>{data.from}</span></div>
              <div><span>To:</span><span>{data.to}</span></div>
            </div>
            <div><span>{new Date(Date.parse(data.departure_time)).toLocaleDateString(
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
        <div class="colomn">
          <span class="text">{data.from}</span><span class="text">-</span><span class="text">{data.to}</span><span class="text">({data.available_seats})</span>
          <div style={{ marginTop: '10px' }}>
            <div class="textinput"><label for="fname">Tickets:</label></div>
            <div class="textinput"><input type="number" id="fticket" name="fname"  min={0} max={data.available_seats} onChange={(event) => { ticketfunction(event) }} /></div>
            <p style={{color: "red",fontSize:"10px",textAlign:"start",marginLeft: '10px' }}>{ticketError}</p>
          </div>
          <table class="table">
            <tr>
              <td style={{ textAlign: 'start' }}>Basic Fare:</td>
              <td style={{ textAlign: 'end' }}>{data.Fare}</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'start' }}>Total Tickets:</td>
              <td style={{ textAlign: 'end' }}>{ticket}</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'start' }}>Total Bus Fare:</td>
              <td style={{ textAlign: 'end' }}>{ticket * data.Fare}</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'start' }}>GST:</td>
              <td style={{ textAlign: 'end' }}>{getGst(ticket * data.Fare)}</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'start' }}>Road Tax:</td>
              <td style={{ textAlign: 'end' }}>{getRoadTax(ticket * data.Fare)}</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'start' }}>Service Tax:</td>
              <td style={{ textAlign: 'end' }}>{getServiceTax(ticket * data.Fare)}</td>
            </tr>
            <tr >
              <td style={{ textAlign: 'start', padding: '30px 0px' }}>Total Fare:</td>
              <td style={{ textAlign: 'end' }}>{getAmont()}{" "}₹
              </td>
            </tr>
          </table>

          <span style={{ display: 'flex', justifyContent: 'center' }}><button class="button" onClick={() => handleBooking(name, seatNumber, ticket, data, getAmont())}>Confirm Booking</button></span>

        </div>
      </div>
    </div>
  );
}

export default TicketBookDetails;