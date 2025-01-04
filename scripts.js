// Login Form Submission
document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('https://expo-tgib.onrender.com/api/auth/login', { // Updated URL
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            const data = await response.json();
            alert('Login Successful!');
            document.querySelector('.login-container .search-form').classList.remove('hidden');
        } else {
            alert('Invalid Login. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
    }
});

// Bus Search Form Submission
document.getElementById('searchBusForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const fromCity = document.getElementById('fromCity').value;
    const toCity = document.getElementById('toCity').value;
    const journeyDate = document.getElementById('journeyDate').value;

    try {
        const response = await fetch(`https://expo-tgib.onrender.com/api/buses?from=${fromCity}&to=${toCity}&date=${journeyDate}`); // Updated URL
        const buses = await response.json();

        const busList = document.getElementById('busList');
        busList.innerHTML = '';

        buses.forEach(bus => {
            const li = document.createElement('li');
            li.textContent = `${bus.name} | ₹${bus.fare}`;
            busList.appendChild(li);
        });
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while searching for buses.');
    }
});
