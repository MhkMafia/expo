-- Create Users Table
CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255)
);

-- Create Buses Table
CREATE TABLE Buses (
    bus_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    from_city VARCHAR(100),
    to_city VARCHAR(100),
    journey_date DATE,
    fare DECIMAL(10, 2)
);

-- Create Bookings Table
CREATE TABLE Bookings (
    booking_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    bus_id INT,
    seat_no INT,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (bus_id) REFERENCES Buses(bus_id)
);
