CREATE TABLE pacman_scores (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    score INT
)

INSERT INTO pacman_scores (name, score) VALUES ('Fran', 1000)