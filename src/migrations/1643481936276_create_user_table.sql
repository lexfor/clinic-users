CREATE TABLE IF NOT EXISTS users (
id UUID NOT NULL,
first_name VARCHAR(255) NOT NULL,
last_name VARCHAR(255) NOT NULL,
gender VARCHAR(255) NOT NULL,
address VARCHAR(255) NOT NULL,
birthday timestamp NOT NULL,
photo VARCHAR(255),
credential_id UUID NOT NULL,
PRIMARY KEY (id),
FOREIGN KEY (credential_id) REFERENCES credentials(id) ON DELETE CASCADE ON UPDATE CASCADE);

CREATE INDEX firstName_index ON users(first_name);
CREATE INDEX lastName_index ON users(last_name);
