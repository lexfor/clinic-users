CREATE TABLE IF NOT EXISTS credentials (
id UUID,
login VARCHAR(255),
password VARCHAR(255),
PRIMARY KEY (id));

CREATE UNIQUE INDEX login_index ON credentials(login);
