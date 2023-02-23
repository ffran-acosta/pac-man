CREATE TABLE snake_score (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    level VARCHAR(255),
    score INT
)

INSERT INTO snake_score (name, level, score) VALUES ('Fran', 'slow', 25)