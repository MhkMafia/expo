document.addEventListener("DOMContentLoaded", function () {
    const authSection = document.getElementById("auth-section");
    const signUpSection = document.getElementById("sign-up-section");
    const busSearchSection = document.getElementById("bus-search-section");
    const seatSelectionSection = document.getElementById("seat-selection-section");
    const proceedToDetails = document.getElementById("proceed-to-details");
    let selectedSeat = null;

    // Switch between Sign In and Sign Up
    document.getElementById("show-sign-up").addEventListener("click", function () {
        authSection.classList.add("hidden");
        signUpSection.classList.remove("hidden");
    });

    document.getElementById("show-sign-in").addEventListener("click", function () {
        signUpSection.classList.add("hidden");
        authSection.classList.remove("hidden");
    });

    // Sign In Form Submission
    document.getElementById("sign-in-form").addEventListener("submit", async function (e) {
        e.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        try {
            const response = await fetch('https://galacticroutesbackend.onrender.com/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error('Login failed. Please check your credentials.');
            }

            const data = await response.json();
            alert('Login Successful!');
            authSection.classList.add("hidden");
            busSearchSection.classList.remove("hidden");
        } catch (error) {
            console.error('Error:', error);
            alert(error.message);
        }
    });

    // Sign Up Form Submission
    document.getElementById("sign-up-form").addEventListener("submit", async function (e) {
        e.preventDefault();
        const name = document.getElementById("sign-up-name").value;
        const email = document.getElementById("sign-up-email").value;
        const password = document.getElementById("sign-up-password").value;

        try {
            const response = await fetch('https://galacticroutesbackend.onrender.com/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            });

            if (!response.ok) {
                throw new Error('Sign-Up failed. Email might already be registered.');
            }

            alert('Sign-Up Successful! Please log in.');
            signUpSection.classList.add("hidden");
            authSection.classList.remove("hidden");
        } catch (error) {
            console.error('Error:', error);
            alert(error.message);
        }
    });

    // Bus Search Form Submission
    document.getElementById("bus-search-form").addEventListener("submit", async function (e) {
        e.preventDefault();
        const fromCity = document.getElementById("from-city").value;
        const toCity = document.getElementById("to-city").value;
        const journeyDate = document.getElementById("journey-date").value;
        const busType = document.getElementById("bus-type").value;

        try {
            const response = await fetch(`https://galacticroutesbackend.onrender.com/api/buses?from=${fromCity}&to=${toCity}&date=${journeyDate}&type=${busType}`);
            const buses = await response.json();

            const busList = document.getElementById("bus-list");
            busList.innerHTML = '';
            if (buses.length > 0) {
                buses.forEach(bus => {
                    const li = document.createElement('li');
                    li.textContent = `${bus.name} | ₹${bus.fare} | ${bus.type}`;
                    const selectButton = document.createElement('button');
                    selectButton.textContent = 'Select Bus';
                    selectButton.addEventListener('click', function () {
                        busSearchSection.classList.add("hidden");
                        seatSelectionSection.classList.remove("hidden");
                        renderSeatGrid(bus.bus_id); // Pass the selected bus ID
                    });
                    li.appendChild(selectButton);
                    busList.appendChild(li);
                });
            } else {
                busList.innerHTML = '<li>No buses found.</li>';
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to search buses. Please try again.');
        }
    });

    // Render Seat Grid
    async function renderSeatGrid(busId) {
        try {
            const response = await fetch(`https://galacticroutesbackend.onrender.com/api/bookings/${busId}`);
            const bookedSeats = await response.json();

            const seatGrid = document.getElementById("seat-selection-grid");
            seatGrid.innerHTML = '';
            for (let i = 1; i <= 35; i++) {
                const seatButton = document.createElement("button");
                seatButton.textContent = i;
                seatButton.disabled = bookedSeats.includes(i);
                if (seatButton.disabled) seatButton.classList.add("booked");

                seatButton.addEventListener("click", function () {
                    selectedSeat = i;
                    seatGrid.querySelectorAll("button").forEach(btn => btn.classList.remove("selected"));
                    seatButton.classList.add("selected");
                    proceedToDetails.classList.remove("hidden");
                });

                seatGrid.appendChild(seatButton);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to load seat availability. Please try again.');
        }
    }

    // Proceed to Payment
    proceedToDetails.addEventListener("click", async function () {
        if (!selectedSeat) {
            alert("Please select a seat!");
            return;
        }

        const userId = 1; // Replace with actual logged-in user ID
        const busId = 1;  // Replace with selected bus ID

        try {
            const response = await fetch('https://galacticroutesbackend.onrender.com/api/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, busId, seatNo: selectedSeat }),
            });

            if (!response.ok) {
                throw new Error('Seat booking failed. It might already be booked.');
            }

            alert("Booking Successful!");
            seatSelectionSection.classList.add("hidden");
            busSearchSection.classList.remove("hidden");
        } catch (error) {
            console.error('Error:', error);
            alert(error.message);
        }
    });
});
