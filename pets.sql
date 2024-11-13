DROP TABLE IF EXISTS pet;

DROP TABLE IF EXISTS pet_owner;

DROP TABLE IF EXISTS pet_kind;

CREATE TABLE pet_owner (
	id serial PRIMARY KEY,
	name varchar(50),
	age integer
);

CREATE TABLE pet_kind (id serial PRIMARY KEY, name varchar(20));

CREATE TABLE pet (
	id serial PRIMARY KEY,
	name varchar(50),
	age integer,
	weight_in_kg numeric,
	owner_id integer,
	kind_id integer,
	FOREIGN key (owner_id) REFERENCES pet_owner (id),
	FOREIGN key (kind_id) REFERENCES pet_kind (id)
);

-- Insert pet owners
INSERT INTO
	pet_owner (name, age)
VALUES
	('Alice', 30),
	('Bob', 45),
	('Carol', 28),
	('David', 52),
	('Emma', 34),
	('Frank', 40),
	('Grace', 60),
	('Hannah', 25),
	('Ian', 55),
	('Julia', 38);

-- Insert pet kinds
INSERT INTO
	pet_kind (name)
VALUES
	('dog'),
	('cat'),
	('reptile'),
	('insect');

INSERT INTO
	pet (name, age, weight_in_kg, owner_id, kind_id)
VALUES
	('Bella', 3, 12.5, 1, 1),
	-- Dog owned by Alice
	('Max', 5, 15.0, 1, 1),
	-- Dog owned by Alice
	('Whiskers', 2, 4.5, 2, 2),
	-- Cat owned by Bob
	('Shadow', 4, 4.8, 2, 2),
	-- Another Cat owned by Bob
	('Fluffy', 6, 0.05, NULL, 4),
	-- Insect without an owner
	('Rex', 8, 20.0, 5, 1),
	-- Dog owned by Emma
	('Goldie', 3, 0.2, NULL, 3),
	-- Reptile without an owner
	('Sasha', 4, 8.3, 6, 2),
	-- Cat owned by Frank
	('Buddy', 2, 10.0, 1, 1),
	-- Another Dog owned by Alice
	('Cleo', 5, 12.5, NULL, 2),
	-- Cat without an owner
	('Ziggy', 3, 2.1, 7, 3),
	-- Reptile owned by Grace
	('Tiny', 1, 0.02, NULL, 4),
	-- Insect without an owner
	('Milo', 4, 11.2, 8, 1),
	-- Dog owned by Hannah
	('Bella', 5, 13.0, 8, 1),
	-- Another Dog owned by Hannah
	('Simba', 2, 4.5, 9, 2),
	-- Cat owned by Ian
	('Toto', 6, 7.3, NULL, 1),
	-- Dog without an owner
	('Slinky', 3, 1.8, 10, 3),
	-- Reptile owned by Julia
	('Buzz', 2, 0.03, 6, 4);

-- Insect owned by Frank