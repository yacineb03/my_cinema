CREATE TABLE IF NOT EXISTS movies (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description text,
    duration INT NOT NULL,
    release_date DATE 
);

CREATE TABLE IF NOT EXISTS rooms ( 
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    capacity INT NOT NULL ,
    type VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS screenings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    movie_id INT NOT NULL,
    room_id INT NOT NULL ,
    start_time DATETIME NOT NULL ,
    FOREIGN KEY (movie_id) REFERENCES movies(id),
    FOREIGN KEY (room_id) REFERENCES rooms(id)
);

INSERT INTO movies (title, description, duration, release_date) VALUES 
('The Batman', 'Le Chevalier Noir enquête dans les bas-fonds de Gotham.', 176, '2022-03-02'),
('Inception', 'Un voleur qui subtilise des secrets par le biais du rêve.', 148, '2010-07-21'),
('Interstellar', 'Un voyage à travers un trou de ver pour sauver l''humanité.', 169, '2014-11-05'),
('Ratatouille', 'Un rat qui rêve de devenir un grand chef cuisinier français.', 110, '2007-08-01'),
('Oppenheimer', 'L''histoire du père de la bombe atomique.', 180, '2023-07-19'),
('Toy Story', 'La vie secrète des jouets quand les humains ne sont pas là.', 81, '1995-11-22');


INSERT INTO rooms (name, capacity, type) VALUES 
('Salle Prestige', 25, 'VIP'),
('Grande Salle Orphée', 350, 'Standard'),
('L''immersion', 120, '4DX'),
('Salle Junior', 60, 'Enfants');



