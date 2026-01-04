
-- @block
CREATE TABLE IF NOT EXISTS therapists (
    id INT PRIMARY KEY AUTO_INCREMENT, 
    first_name VARCHAR(50),
    last_name VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS clients (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    therapist_id INT,
    FOREIGN KEY (therapist_id)
    REFERENCES therapists(id)
);

CREATE TABLE IF NOT EXISTS sessions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    date DATE,
    therapist_id INT,
    client_id INT,
    FOREIGN KEY (therapist_id)
    REFERENCES therapists(id),
    FOREIGN KEY (client_id)
    REFERENCES clients(id)
);

-- @block 
DESCRIBE sessions

-- @block
-- Seed therapists
INSERT INTO therapists (first_name, last_name) VALUES
('Chicken', 'Bake'),
('Richard', 'Warren'),
('Davis', 'Jackson');

-- Seed clients
INSERT INTO clients (first_name, last_name, therapist_id) VALUES
('David', 'Miller', 1),
('Emma', 'Brown', 1),
('Frank', 'Wilson', 2),
('Grace', 'Taylor', 3),
('Hannah', 'Anderson', 2);

-- Seed sessions
INSERT INTO sessions (date, therapist_id, client_id) VALUES
('2025-12-01', 1, 1),
('2025-12-03', 1, 2),
('2025-12-05', 2, 3),
('2025-12-06', 3, 4),
('2025-12-07', 2, 5),
('2025-12-08', 1, 2);

-- @block
SELECT * FROM clients


-- @block 
INSERT INTO therapists (first_name, last_name)
VALUES ("Lucy", "Frank")

-- @block 
DELETE FROM clients WHERE id = 10