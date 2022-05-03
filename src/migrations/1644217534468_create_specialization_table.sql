CREATE TABLE IF NOT EXISTS specializations (
id UUID NOT NULL,
name VARCHAR(255) NOT NULL,
PRIMARY KEY (id));

CREATE INDEX specializationName_index ON specializations(name);
