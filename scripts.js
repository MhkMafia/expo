document.addEventListener("DOMContentLoaded", function () {
    const authSection = document.getElementById("auth-section");
    const signUpSection = document.getElementById("sign-up-section");
    const busSearchSection = document.getElementById("bus-search-section");
    const seatSelectionSection = document.getElementById("seat-selection-section");
    const adminSection = document.getElementById("admin-section");

    let selectedSeat = null;

    // Toggle between Sign-In and Sign-Up
    document.getElementById("show-sign-up").addEventListener("click", function () {
        authSection.classList.add("hidden");
        signUpSection.classList.remove("hidden");
    });

    document.getElementById("show-sign-in").addEventListener("click", function () {
        signUpSection.classList.add("hidden");
        authSection.classList.remove("hidden");
    });

    // Sign-In Form Submission
    document.getElementById("sign-in-form").addEventListener("submit", async function (e) {
        e.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const response = await fetch('https://expo-tgib.onrender.com/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            alert('Login Successful!');
            authSection.classList.add("hidden");
            busSearchSection.classList.remove("hidden");
        } else {
            alert('Invalid credentials!');
        }
    });

    // Sign-Up Form Submission
    document.getElementById("sign-up-form").addEventListener("submit", async function (e) {
        e.preventDefault();
        const name = document.getElementById("sign-up-name").value;
        const email = document.getElementById("sign-up-email").value;
        const password = document.getElementById("sign-up-password").value;

        const response = await fetch('https://expo-tgib.onrender.com/api/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password }),
        });

        if (response.ok) {
            alert('Sign-Up Successful! Please log in.');
            signUpSection.classList.add("hidden");
            authSection.classList.remove("hidden");
        } else {
            alert('Sign-Up Failed! Try another email.');
        }
    });

    // Fetch and Render Seat Grid
    async function renderSeatGrid(busId) {
        const response = await fetch(`https://expo-tgib.onrender.com/api/bookings/${busId}`);
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
            });

            seatGrid.appendChild(seatButton);
        }
    }

    // Bus Search Form Submission
    document.getElementById("bus-search-form").addEventListener("submit", async function (e) {
        e.preventDefault();
        const fromCity = document.getElementById("from-city").value;
        const toCity = document.getElementById("to-city").value;
        const journeyDate = document.getElementById("journey-date").value;
        const busType = document.getElementById("bus-type").value;

        const response = await fetch(`https://expo-tgib.onrender.com/api/buses?from=${fromCity}&to=${toCity}&date=${journeyDate}&type=${busType}`);
        const buses = await response.json();

        const busList = document.getElementById("bus-list");
        busList.innerHTML = '';
        if (buses.length > 0) {
            buses.forEach(bus => {
                const li = document.createElement('li');
                li.textContent = `${bus.name} | ₹${bus.fare} | ${bus.type}`;
                const                 selectButton = document.createElement('button');
                selectButton.textContent = 'Select Bus';
                selectButton.addEventListener('click', function () {
                    busSearchSection.classList.add("hidden");
                    seatSelectionSection.classList.remove("hidden");
                    renderSeatGrid(bus.bus_id); // Pass bus ID to render seats
                });
                li.appendChild(selectButton);
                busList.appendChild(li);
            });
        } else {
            busList.innerHTML = '<li>No buses found.</li>';
        }
    });

    // Add Bus (Admin Section)
    document.getElementById("add-bus-form").addEventListener("submit", async function (e) {
        e.preventDefault();
        const name = document.getElementById("bus-name").value;
        const fromCity = document.getElementById("from-city-admin").value;
        const toCity = document.getElementById("to-city-admin").value;
        const journeyDate = document.getElementById("journey-date-admin").value;
        const fare = document.getElementById("fare").value;
        const type = document.getElementById("bus-type-admin").value;

        const response = await fetch('https://expo-tgib.onrender.com/api/buses/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, fromCity, toCity, journeyDate, fare, type }),
        });

        if (response.ok) {
            alert('Bus added successfully!');
        } else {
            alert('Failed to add bus.');
        }
    });
});

