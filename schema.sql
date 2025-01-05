-- Create Users Table
CREATE TABLE IF NOT EXISTS Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);


-- Create Buses Table
CREATE TABLE IF NOT EXISTS Buses (
    bus_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    from_city VARCHAR(100) NOT NULL,
    to_city VARCHAR(100) NOT NULL,
    journey_date DATE NOT NULL,
    fare DECIMAL(10, 2) NOT NULL,
    type VARCHAR(20) NOT NULL
);


-- Create Bookings Table
CREATE TABLE IF NOT EXISTS Bookings (
    booking_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    bus_id INT NOT NULL,
    seat_no INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (bus_id) REFERENCES Buses(bus_id),
    UNIQUE(bus_id, seat_no) -- Prevent duplicate bookings for the same seat
);

